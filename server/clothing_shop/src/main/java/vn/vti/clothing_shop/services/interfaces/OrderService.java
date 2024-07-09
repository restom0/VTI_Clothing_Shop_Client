package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.OrderCreateRequest;
import vn.vti.clothing_shop.dto.in.OrderUpdateRequest;
import vn.vti.clothing_shop.entities.Order;

import java.util.List;

@Component
public interface OrderService {
    List<Order> getAllOrders();
    List<Order> getAllOrdersByUserId(Long userId);
    Order getOrderByIdAndUserId(Long id,Long userId);
    Boolean addOrder(OrderCreateRequest orderCreateRequest,Long userId);
    Boolean updateOrder(OrderUpdateRequest orderUpdateRequest, Long id);
    Boolean deleteOrder(Long id);
}
