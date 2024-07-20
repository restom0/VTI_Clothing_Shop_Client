package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.vti.clothing_shop.entities.Email;

import java.util.List;

@Repository
public interface EmailRepository extends JpaRepository<Email,Long> {
    @Override
    @Query("SELECT e FROM Email e WHERE e.deleted_at IS NULL")
    @NotNull
    List<Email> findAll();

    Email findByEmail(String email);
}
