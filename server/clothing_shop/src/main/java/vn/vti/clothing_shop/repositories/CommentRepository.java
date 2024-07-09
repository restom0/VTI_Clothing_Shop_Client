package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long>{
    @Override
    @Query("SELECT c FROM Comment c WHERE c.deleted_at IS NULL")
    @NotNull
    List<Comment> findAll();

    @Query("SELECT c FROM Comment c WHERE c.product_id = ?1 AND c.deleted_at IS NULL ORDER BY c.created_at DESC")
    List<Comment> findByProductId(Long product_id);

    @Query("SELECT c FROM Comment c WHERE c.id = ?1 AND c.product_id=?2 AND c.user_id=?3 AND c.deleted_at IS NULL")
    Optional<Comment> findByProductIdAndId(Long id, Long product_id, Long user_id);

    @Query("SELECT c FROM Comment c WHERE c.id = ?1 AND c.user_id=?2 AND c.deleted_at IS NULL")
    Optional<Comment> findByUserIdAndId(Long id, Long user_id);
}
