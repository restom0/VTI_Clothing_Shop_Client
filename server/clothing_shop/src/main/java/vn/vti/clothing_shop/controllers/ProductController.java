package vn.vti.clothing_shop.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.dto.in.ProductCreateRequest;
import vn.vti.clothing_shop.dto.in.ProductUpdateRequest;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.entities.Product;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.services.implementations.ProductServiceImplementation;
import vn.vti.clothing_shop.utils.ParameterUtils;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/product")
public class ProductController {
    @Autowired
    private final ProductServiceImplementation productServiceImplementation;

    public ProductController(ProductServiceImplementation productServiceImplementation) {
        this.productServiceImplementation = productServiceImplementation;
    }

    @GetMapping("/")
    public ResponseEntity<Object> getAllProducts(){
        try {
            return ResponseHandler.responseBuilder(200,"Lấy danh sách sản phẩm thành công",productServiceImplementation.getAllProducts(), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> addProduct(@RequestBody @Valid ProductCreateRequest productCreateRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(productServiceImplementation.addProduct(productCreateRequest)) {
                return ResponseHandler.responseBuilder(201, "Thêm sản phẩm thành công", productServiceImplementation.addProduct(productCreateRequest), HttpStatus.CREATED);
            }
            throw new InternalServerErrorException("Thêm sản phẩm thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody @Valid ProductUpdateRequest productUpdateRequest, @PathVariable @NotNull(message = "Vui lòng chọn sản phẩm") Long id,BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(productServiceImplementation.updateProduct(productUpdateRequest,id)){
                return ResponseHandler.responseBuilder(200,"Cập nhật sản phẩm thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Cập nhật sản phẩm thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable @NotNull(message = "Vui lòng chọn sản phẩm") Long id,BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(productServiceImplementation.deleteProduct(id)){
                return ResponseHandler.responseBuilder(200,"Xóa sản phẩm thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Xóa sản phẩm thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable @NotNull(message = "Vui lòng chọn sản phẩm") Long id,BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            Product product = productServiceImplementation.getProductById(id);
            if(product!=null){
                return ResponseHandler.responseBuilder(200,"Lấy sản phẩm thành công",product, HttpStatus.OK);
            }
            throw new NotFoundException("Sản phẩm không tồn tại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
}
