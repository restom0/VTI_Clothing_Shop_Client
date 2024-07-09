package vn.vti.clothing_shop.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dto.in.ImportedProductCreateRequest;
import vn.vti.clothing_shop.dto.in.ImportedProductUpdateRequest;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.services.implementations.ImportedProductServiceImplementation;
import vn.vti.clothing_shop.utils.ParameterUtils;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/imported-product")
public class ImportedProductController {
    @Autowired
    private final ImportedProductServiceImplementation importedProductServiceImplementation;

    public ImportedProductController(ImportedProductServiceImplementation importedProductServiceImplementation) {
        this.importedProductServiceImplementation = importedProductServiceImplementation;
    }
    @GetMapping("/")
    public ResponseEntity<Object> getAllImportedProducts(){
        try{
            return ResponseHandler.responseBuilder(200,"Lấy danh sách sản phẩm nhập khẩu thành công",importedProductServiceImplementation.getAllImportedProducts(), HttpStatus.OK);
            }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PostMapping ("/")
    public ResponseEntity<?> addImportedProduct(@RequestBody @Valid ImportedProductCreateRequest importedProductCreateRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(importedProductServiceImplementation.addImportedProduct(importedProductCreateRequest)){
                return ResponseHandler.responseBuilder(201,"Thêm sản phẩm nhập khẩu thành công",null, HttpStatus.CREATED);
            }
            throw new InternalServerErrorException("Thêm sản phẩm nhập khẩu thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateImportedProduct(@RequestBody @Valid ImportedProductUpdateRequest importedProductUpdateRequest, @PathVariable @NotNull(message = "Vui lòng chọn sản phẩm") Long id, @org.jetbrains.annotations.NotNull BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(importedProductServiceImplementation.updateImportedProduct(importedProductUpdateRequest,id)){
                return ResponseHandler.responseBuilder(200,"Cập nhật sản phẩm nhập khẩu thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Cập nhật sản phẩm nhập khẩu thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImportedProduct(@PathVariable @NotNull(message = "Vui lòng chọn sản phẩm") Long id, @org.jetbrains.annotations.NotNull BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(id == null){
                throw new BadRequestException("Vui lòng chọn sản phẩm");
            }
            if(importedProductServiceImplementation.deleteImportedProduct(id)){
                return ResponseHandler.responseBuilder(200,"Xóa sản phẩm nhập khẩu thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Xóa sản phẩm nhập khẩu thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @GetMapping("/{filter}/{id}")
    public ResponseEntity<?> getImportedProductById(@PathVariable @NotNull(message = "Vui lòng chọn bộ lọc") Filter filter, @PathVariable @NotNull(message = "Vui lòng chọn sản phẩm") Long id, @org.jetbrains.annotations.NotNull BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            return ResponseHandler.responseBuilder(200,"Lấy sản phẩm nhập khẩu thành công",importedProductServiceImplementation.getImportedProductByFilter(filter,id), HttpStatus.OK);
            }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }

}
