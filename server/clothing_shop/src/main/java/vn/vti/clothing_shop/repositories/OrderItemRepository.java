package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.vti.clothing_shop.entities.OrderItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
    @Override
    @Query("SELECT oi FROM OrderItem oi WHERE oi.deleted_at IS NULL")
    @NotNull
    List<OrderItem> findAll();

    @Override
    @Query("SELECT oi FROM OrderItem oi WHERE oi.id = ?1 AND oi.deleted_at IS NULL")
    @NotNull
    Optional<OrderItem> findById(@NotNull Long id);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.order_id = ?1 AND oi.deleted_at IS NULL")
    List<OrderItem> findAllByOrderId(Long orderId);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.id = ?1 AND oi.order_id = ?2 AND oi.deleted_at IS NULL")
    Optional<OrderItem> findByIdAndOrderId(Long id, Long orderId);
}
