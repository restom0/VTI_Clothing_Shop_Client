package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.OrderItemCreateDTO;
import vn.vti.clothing_shop.dto.in.OrderItemUpdateDTO;
import vn.vti.clothing_shop.dto.out.OrderItemDTO;
import vn.vti.clothing_shop.entities.OrderItem;

import java.util.List;

@Component
public interface OrderItemService {
    List<OrderItemDTO> getAllOrderItem();
    List<OrderItemDTO> getAllOrderItemsByOrderId(Long orderId);
    OrderItemDTO getOrderItemByIdAndOrderId(Long id,Long orderId);
    Boolean addOrderItem(OrderItemCreateDTO orderItemCreateDTO);
    Boolean updateOrderItem(OrderItemUpdateDTO orderItemUpdateDTO);
    Boolean deleteOrderItem(Long id);
}
