package vn.vti.clothing_shop.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.services.implementations.BrandServiceImplementation;
import vn.vti.clothing_shop.utils.ParameterUtils;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/brand")
@RestController
public class BrandController {
    @Autowired
    private final BrandServiceImplementation brandServiceImplementation;

    public BrandController(BrandServiceImplementation brandServiceImplementation) {
        this.brandServiceImplementation = brandServiceImplementation;
    }

    @GetMapping("/")
    public ResponseEntity<Object> getAllBrands(){
        try{
            return ResponseHandler.responseBuilder(200,"Lấy danh sách thương hiệu thành công",brandServiceImplementation.getAllBrands(), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }

    }
    @PostMapping("/")
    public ResponseEntity<?> addBrand(@RequestBody @Valid String name, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(brandServiceImplementation.addBrand(name)){
                return ResponseHandler.responseBuilder(201,"Thêm thương hiệu thành công",null, HttpStatus.CREATED);
            }
            throw new InternalServerErrorException("Thêm thương hiệu thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand(@RequestBody @Valid String name, @PathVariable @NotNull(message = "Vui lòng chọn brand") Long id, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(brandServiceImplementation.updateBrand(name, id)){
                return ResponseHandler.responseBuilder(200,"Cập nhật thương hiệu thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Cập nhật thương hiệu thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable @NotNull(message = "Vui lòng chọn brand") Long id, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(brandServiceImplementation.deleteBrand(id)){
                return ResponseHandler.responseBuilder(200,"Xóa thương hiệu thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Xóa thương hiệu thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
}
