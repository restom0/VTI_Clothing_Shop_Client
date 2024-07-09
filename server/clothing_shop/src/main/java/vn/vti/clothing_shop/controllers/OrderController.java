package vn.vti.clothing_shop.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.dto.out.ResponseHandler;

@RestController
@RequestMapping("/order")
public class OrderController {
    @GetMapping("/")
    public ResponseEntity<?> getAllOrders() {
        try{
            return ResponseHandler.responseBuilder(200,"Lấy đơn hàng thành công",null, HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PostMapping("/")
    public ResponseEntity<?> addOrder() {
        try {
            return ResponseHandler.responseBuilder(201,"Thêm đơn hàng thành công",null, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id) {
        try {
            return ResponseHandler.responseBuilder(200,"Cập nhật đơn hàng thành công",null, HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            return ResponseHandler.responseBuilder(200,"Xóa đơn hàng thành công",null, HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseHandler.exceptionBuilder(e);
        }
    }
}
