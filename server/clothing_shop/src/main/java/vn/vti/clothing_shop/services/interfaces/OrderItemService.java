package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.entities.OrderItem;

import java.util.List;

@Component
public interface OrderItemService {
    List<OrderItem> countAndSortOrderItems();
    List<OrderItem> getAllOrderItemsByOrderId(Long orderId);
    OrderItem getOrderItemByIdAndOrderId(Long id,Long orderId);
    Boolean addOrderItem(OrderItem orderItem,Long orderId);
    Boolean updateOrderItem(OrderItem orderItem, Long id);
    Boolean deleteOrderItem(Long id);
}
