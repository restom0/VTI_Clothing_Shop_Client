package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import vn.vti.clothing_shop.constants.PaymentMethod;
import vn.vti.clothing_shop.constants.PaymentStatus;
import vn.vti.clothing_shop.dto.in.OrderCreateRequest;
import vn.vti.clothing_shop.dto.in.OrderUpdateRequest;
import vn.vti.clothing_shop.entities.Order;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.OrderItemRepository;
import vn.vti.clothing_shop.repositories.OrderRepository;
import vn.vti.clothing_shop.repositories.UserRepository;
import vn.vti.clothing_shop.repositories.VoucherRepository;
import vn.vti.clothing_shop.services.interfaces.OrderService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class OrderServiceImplementation implements OrderService {
    @Autowired
    private final OrderItemRepository orderItemRepository;

    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final VoucherRepository voucherRepository;

    public OrderServiceImplementation(OrderItemRepository orderItemRepository, OrderRepository orderRepository, UserRepository userRepository, VoucherRepository voucherRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.voucherRepository = voucherRepository;
    }

    public List<Order> getAllOrders(){
        return this.orderRepository.findAll();
    };
    public List<Order> getAllOrdersByUserId(Long userId){
        return this.orderRepository.findAllByUserId(userId);
    };
    public Order getOrderByIdAndUserId(Long id,Long userId){
        Optional<Order> order = this.orderRepository.findOrderByIdAndUserId(id,userId);
        return order.orElse(null);
    };
    public Boolean addOrder(OrderCreateRequest orderCreateRequest,Long userId){
        User user = this.userRepository.findById(userId).orElse(null);
        if(user==null){
            throw new NotFoundException("User not found");
        }
        Order order = new Order();
        order.setUser_id(user);
        order.setAddress(orderCreateRequest.getAddress() != null ? orderCreateRequest.getAddress() : user.getAddress());
        order.setPhone_number(orderCreateRequest.getPhone_number()!=null ? orderCreateRequest.getPhone_number() : user.getPhone_number());
        order.setReceiver_name(orderCreateRequest.getReceiver_name()!=null ? orderCreateRequest.getReceiver_name() : user.getName());
        order.setPresent(orderCreateRequest.isPresent());
        order.setPayment_method(PaymentMethod.valueOf(orderCreateRequest.getPayment_method()));
        order.setPayment_status(PaymentStatus.ONHOLD);
        order.setVoucherId(orderCreateRequest.getVoucherId()!=null ? this.voucherRepository.findById(orderCreateRequest.getVoucherId()).orElse(null) : null);
        this.orderRepository.save(order);
        return true;
    };
    public Boolean updateOrder(OrderUpdateRequest orderUpdateRequest, Long id){
        Order order = this.orderRepository.findById(id).orElse(null);
        if(order==null){
            throw new NotFoundException("Order not found");
        }
        order.setAddress(orderUpdateRequest.getAddress()!=null ? orderUpdateRequest.getAddress() : order.getAddress());
        order.setPhone_number(orderUpdateRequest.getPhone_number()!=null ? orderUpdateRequest.getPhone_number() : order.getPhone_number());
        order.setReceiver_name(orderUpdateRequest.getReceiver_name()!=null ? orderUpdateRequest.getReceiver_name() : order.getReceiver_name());
        order.setPayment_status(orderUpdateRequest.getPayment_status()!=null? PaymentStatus.valueOf(orderUpdateRequest.getPayment_status()) : order.getPayment_status());
        this.orderRepository.save(order);
        return true;

    };
    public Boolean deleteOrder(Long id) {
        Order order = this.orderRepository.findById(id).orElse(null);
        if (order == null) {
            throw new NotFoundException("Order not found");
        }
        order.setDeleted_at(LocalDateTime.now());
        this.orderRepository.save(order);
        return true;
    };
}
