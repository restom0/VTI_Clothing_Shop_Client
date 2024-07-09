package vn.vti.clothing_shop.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.services.implementations.CategoryServiceImplementation;
import vn.vti.clothing_shop.utils.ParameterUtils;

import java.util.HashMap;
import java.util.Map;

public class CategoryController {
    @Autowired
    private final CategoryServiceImplementation categoryServiceImplementation;

    public CategoryController(CategoryServiceImplementation categoryServiceImplementation) {
        this.categoryServiceImplementation = categoryServiceImplementation;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllCategories(){
        try{
            return ResponseHandler.responseBuilder(200,"Lấy danh sách danh mục thành công",categoryServiceImplementation.getAllCategories(), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody @Valid String name, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try {
            if(categoryServiceImplementation.addCategory(name)){
                return ResponseHandler.responseBuilder(201,"Thêm danh mục thành công",null, HttpStatus.CREATED);
            }
            throw new InternalServerErrorException("Thêm danh mục thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody @Valid String name, @PathVariable @NotNull(message = "Vui lòng chọn category") Long id, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(categoryServiceImplementation.updateCategory(name, id)){
                return ResponseHandler.responseBuilder(200,"Cập nhật danh mục thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Cập nhật danh mục thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable @NotNull(message = "Vui lòng chọn category") Long id, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(categoryServiceImplementation.deleteCategory(id)){
                return ResponseHandler.responseBuilder(200,"Xóa danh mục thành công",null, HttpStatus.OK);
            }
            throw new InternalServerErrorException("Xóa danh mục thất bại");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
}
