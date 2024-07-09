package vn.vti.clothing_shop.controllers;

import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.dto.in.UserCreateRequest;
import vn.vti.clothing_shop.dto.in.UserReadRequest;
import vn.vti.clothing_shop.dto.out.ErrorResponse;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.exceptions.UnauthorizeException;
import vn.vti.clothing_shop.services.implementations.UserServiceImplementation;
import vn.vti.clothing_shop.utils.ParameterUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
@RequestMapping(value = "/user")
@RestController
public class UserController {
    @Autowired
    private final UserServiceImplementation userServiceImplementation;

    public UserController(UserServiceImplementation userServiceImplementation) {
        this.userServiceImplementation = userServiceImplementation;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid UserReadRequest userReadRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try {
            return  ResponseHandler.responseBuilder(200,"Đăng nhập thành công", Objects.requireNonNull(userServiceImplementation.getUser(userReadRequest.getUsername(), userReadRequest.getEmail(), userReadRequest.getPhone_number(), userReadRequest.getPassword())), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserCreateRequest userCreateRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try {
            if(userServiceImplementation.addUser(userCreateRequest)){
                return ResponseHandler.responseBuilder(201,"Đăng ký thành công",null, HttpStatus.CREATED);
            }
            else {
                throw new InternalServerErrorException("Đăng ký thất bại");
            }
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
}
