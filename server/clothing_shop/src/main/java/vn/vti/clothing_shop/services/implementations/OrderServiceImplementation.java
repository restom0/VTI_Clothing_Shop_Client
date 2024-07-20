package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.dtos.ins.OrderCreateDTO;
import vn.vti.clothing_shop.dtos.ins.OrderUpdateDTO;
import vn.vti.clothing_shop.dtos.outs.OrderDTO;
import vn.vti.clothing_shop.entities.Voucher;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.ForbiddenException;
import vn.vti.clothing_shop.mappers.OrderMapper;
import vn.vti.clothing_shop.entities.Order;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.OrderItemRepository;
import vn.vti.clothing_shop.repositories.OrderRepository;
import vn.vti.clothing_shop.repositories.UserRepository;
import vn.vti.clothing_shop.repositories.VoucherRepository;
import vn.vti.clothing_shop.services.interfaces.OrderService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImplementation implements OrderService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final VoucherRepository voucherRepository;
    private final OrderMapper orderMapper;

    @Autowired
    public OrderServiceImplementation(OrderItemRepository orderItemRepository, OrderRepository orderRepository, UserRepository userRepository, VoucherRepository voucherRepository, OrderMapper orderMapper) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.voucherRepository = voucherRepository;
        this.orderMapper = orderMapper;
    }

    public List<OrderDTO> getAllOrders(){
        return this.orderRepository.findAll()
                .stream()
                .map(order -> this.orderMapper
                        .EntityToDTO(order,this.orderItemRepository.findAllByOrderId(order.getId())))
                .toList();
    }

    public List<OrderDTO> getAllOrdersByUserId(Long userId){
        return this.orderRepository.findAllByUserId(userId)
                .stream()
                .map(order -> this.orderMapper
                        .EntityToDTO(order,this.orderItemRepository.findAllByOrderId(order.getId())))
                .toList();
    }
    public OrderDTO getOrderByIdAndUserId(Long id,Long userId){
        return orderMapper.EntityToDTO(this.orderRepository.findOrderByIdAndUserId(id,userId).orElseThrow(()-> new NotFoundException("Order not found")),this.orderItemRepository.findAllByOrderId(id));
    }
    public OrderDTO addOrder(OrderCreateDTO orderCreateDTO){
        User user = this.userRepository.findById(orderCreateDTO.getUser_id()).orElseThrow(()->new ForbiddenException("User not found"));
        return orderMapper.EntityToDTO(this.orderRepository.findByUserIdWithNOT_CONFIRMEDStatus(user.getId()).orElseGet(()->{
            return this.orderRepository.save(orderMapper.CreateDTOToEntity(orderCreateDTO,user));
        }),new ArrayList<>());
    }
    private void subtractStock(Long id){
        Voucher voucher = voucherRepository.findById(id).orElseThrow(()->new NotFoundException("Voucher not found"));
        if(voucher.getStock() < 0
                || voucher.getExpired_date().isBefore(LocalDateTime.now())
                || voucher.getAvailable_date().isAfter(LocalDateTime.now())){
            throw new BadRequestException("Voucher out of stock");
        }
        voucher.setStock(voucher.getStock()-1);
        voucherRepository.save(voucher);
    };
    private void addStock(Long id){
        Voucher voucher = voucherRepository.findById(id).orElseThrow(()->new NotFoundException("Voucher not found"));
        if(voucher.getStock() < 0
                || voucher.getExpired_date().isBefore(LocalDateTime.now())
                || voucher.getAvailable_date().isAfter(LocalDateTime.now())){
            throw new BadRequestException("Voucher out of stock");
        }
        voucher.setStock(voucher.getStock()+1);
        voucherRepository.save(voucher);
    };
    public Boolean updateOrder(OrderUpdateDTO orderUpdateDTO){
        Order order = this.orderRepository.findById(orderUpdateDTO.getId()).orElseThrow(()-> new NotFoundException("Order not found"));
        Voucher voucher = this.voucherRepository.findById(orderUpdateDTO.getVoucherId()).orElseThrow(()-> new NotFoundException("Voucher not found"));
        subtractStock(voucher.getId());
        this.orderRepository.save(orderMapper.UpdateDTOToEntity(orderUpdateDTO,order,voucher));
        return true;

    }
    public Boolean deleteOrder(Long id) {
        Order order = this.orderRepository.findById(id).orElseThrow(()-> new NotFoundException("Order not found"));
        addStock(order.getVoucherId().getId());
        order.setDeleted_at(LocalDateTime.now());
        this.orderRepository.save(order);
        return true;
    }
}
