package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import vn.vti.clothing_shop.repositories.OrderItemRepository;

public class OrderItemServiceImplementation {
    @Autowired
    private final OrderItemRepository orderItemRepository;

    public OrderItemServiceImplementation(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }
}
