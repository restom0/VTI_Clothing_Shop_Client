package vn.vti.clothing_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.vti.clothing_shop.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}
