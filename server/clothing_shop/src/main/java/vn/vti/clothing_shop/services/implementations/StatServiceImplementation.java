package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.repositories.OrderRepository;
import vn.vti.clothing_shop.repositories.UserRepository;

import java.util.HashMap;

@Component
public class StatServiceImplementation {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Autowired
    public StatServiceImplementation(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public HashMap<String,Long> getStat(){
        HashMap<String,Long> stat = new HashMap<>();
        stat.put("income", orderRepository.sumTotalPrice());
        stat.put("order", orderRepository.count());
        stat.put("completed",orderRepository.countCompletedOrder());
        stat.put("user", userRepository.count());
        return stat;
    };
}
