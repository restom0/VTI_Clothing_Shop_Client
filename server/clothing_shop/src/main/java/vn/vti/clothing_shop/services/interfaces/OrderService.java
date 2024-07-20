package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.OrderCreateDTO;
import vn.vti.clothing_shop.dto.in.OrderUpdateDTO;
import vn.vti.clothing_shop.dto.out.OrderDTO;
import vn.vti.clothing_shop.requests.OrderCreateRequest;
import vn.vti.clothing_shop.requests.OrderUpdateRequest;
import vn.vti.clothing_shop.entities.Order;

import java.util.List;

@Component
public interface OrderService {
    List<OrderDTO> getAllOrders();
    List<OrderDTO> getAllOrdersByUserId(Long userId);
    OrderDTO getOrderByIdAndUserId(Long id,Long userId);
    OrderDTO addOrder(OrderCreateDTO orderCreateDTO);
    Boolean updateOrder(OrderUpdateDTO orderUpdateDTO);
    Boolean deleteOrder(Long id);
}
