package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.Order;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    @Override
    @Query("SELECT o FROM Order o WHERE o.deletedAt IS NULL")
    @NotNull
    List<Order> findAll();

    @Query("SELECT o FROM Order o WHERE o.deletedAt IS NULL AND o.userId = ?1")
    List<Order> findAllByUserId(Long userId);

    @Override
    @Query("SELECT o FROM Order o WHERE o.deletedAt IS NULL AND o.id = ?1")
    @NotNull
    Optional<Order> findById(Long id);

//    @Query("SELECT o FROM Order o WHERE o.deletedAt IS NULL AND o.id = ?1")
//    Order findOrderById(Long id);

    @Query("SELECT o FROM Order o WHERE o.deletedAt IS NULL AND o.id = ?1 AND o.userId = ?2")
    Optional<Order> findOrderByIdAndUserId(Long id,Long userId);
}
