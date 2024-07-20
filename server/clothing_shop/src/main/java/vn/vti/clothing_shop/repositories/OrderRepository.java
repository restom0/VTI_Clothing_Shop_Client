package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.vti.clothing_shop.entities.Order;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Override
    @Query("SELECT o FROM Order o WHERE o.deleted_at IS NULL")
    @NotNull
    List<Order> findAll();

    @Query("SELECT o FROM Order o WHERE o.deleted_at IS NULL AND o.user_id = ?1")
    List<Order> findAllByUserId(Long userId);

    @Override
    @Query("SELECT o FROM Order o WHERE o.deleted_at IS NULL AND o.id = ?1")
    @NotNull
    Optional<Order> findById(@NotNull Long id);

//    @Query("SELECT o FROM Order o WHERE o.deleted_at IS NULL AND o.id = ?1")
//    Order findOrderById(Long id);

    @Query("SELECT o FROM Order o WHERE o.deleted_at IS NULL AND o.id = ?1 AND o.user_id = ?2")
    Optional<Order> findOrderByIdAndUserId(Long id,Long userId);

    @Query("SELECT o FROM Order o WHERE o.deleted_at IS NULL AND o.user_id = ?1 AND o.payment_status = NOT_CONFIRMED")
    Optional<Order>findByUserIdWithNOT_CONFIRMEDStatus(Long userId);
}
