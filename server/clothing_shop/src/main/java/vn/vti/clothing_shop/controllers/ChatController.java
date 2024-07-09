package vn.vti.clothing_shop.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.dto.in.ChatCreateRequest;
import vn.vti.clothing_shop.dto.in.ChatUpdateRequest;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.exceptions.UnauthorizeException;
import vn.vti.clothing_shop.services.implementations.ChatServiceImplementation;
import vn.vti.clothing_shop.utils.ParameterUtils;

import java.util.HashMap;
import java.util.Map;

import static vn.vti.clothing_shop.constants.RegularExpression.COLOR;
import static vn.vti.clothing_shop.constants.RegularExpression.NUMBER;

@RestController
@RequestMapping("/chat")
public class ChatController {
    @Autowired
    private final ChatServiceImplementation chatServiceImplementation;

    public ChatController(ChatServiceImplementation chatServiceImplementation) {
        this.chatServiceImplementation = chatServiceImplementation;
    }
    @GetMapping("/")
    public ResponseEntity<?> getChat(){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            Long userId = user.getId();
            return ResponseHandler.responseBuilder(200, "Lấy tin nhắn thành công", chatServiceImplementation.getChat(userId), HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PostMapping("/")
    public ResponseEntity<?> addChat(@RequestBody @Valid ChatCreateRequest chatCreateRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            Long userId = user.getId();
            if(chatServiceImplementation.addChat(userId,chatCreateRequest.getContent())){
                return ResponseHandler.responseBuilder(201,"Tin nhắn được gửi thành công",null,HttpStatus.CREATED);
            }
            throw new InternalServerErrorException("Gửi tin nhắn thất bại");
        }
        catch(Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateChat(
            @RequestBody
            @Valid
            ChatUpdateRequest chatUpdateRequest,
            @PathVariable
            @NotNull(message = "Vui lòng chọn tin nhắn")
            Long id,
            BindingResult bindingResult
    ){
        try{
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errors.put(error.getField(), error.getDefaultMessage());
                }
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }
            if(chatServiceImplementation.updateChat(id,chatUpdateRequest.getContent())){
                return ResponseHandler.responseBuilder(200,"Tin nhắn được cập nhật thành công",null,HttpStatus.OK);
            }
            throw new InternalServerErrorException("Cập nhật tin nhắn thất bại");
        }
        catch(Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChat(
            @PathVariable
            @NotNull(message = "Vui lòng chọn tin nhắn")
            Long id
    ){
        try{
            if(chatServiceImplementation.deleteChat(id)){
                return ResponseHandler.responseBuilder(200,"Xóa tin nhắn thành công",null,HttpStatus.OK);
            }
            throw new InternalServerErrorException("Xóa tin nhắn thất bại");
        }
        catch(Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
}
