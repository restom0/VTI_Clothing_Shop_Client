package vn.vti.clothing_shop.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.vti.clothing_shop.dto.in.CommentCreateRequest;
import vn.vti.clothing_shop.dto.in.CommentUpdateRequest;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.services.implementations.CommentServiceImplementation;
import vn.vti.clothing_shop.utils.ParameterUtils;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private final CommentServiceImplementation commentServiceImplementation;

    public CommentController(CommentServiceImplementation commentServiceImplementation) {
        this.commentServiceImplementation = commentServiceImplementation;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllComment(){
        return ResponseHandler.responseBuilder(200,"Lấy bình luận thành công", commentServiceImplementation.getAllComments(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getComment(@PathVariable Long id){
        try{
            return ResponseHandler.responseBuilder(200,"Lấy bình luận thành công", commentServiceImplementation.getCommentById(id),HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PostMapping("/")
    public ResponseEntity<?> addComment(@RequestBody @Valid CommentCreateRequest commentCreateRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            Long userId = user.getId();
            if(this.commentServiceImplementation.createComment(commentCreateRequest,userId)){
                return ResponseHandler.responseBuilder(201,"Bình luận đã được gửi",null,HttpStatus.CREATED);
            }
            throw new InternalServerErrorException("Server Error");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable @NotNull(message = "Hãy chọn bình luận") Long id,@RequestBody @Valid CommentUpdateRequest commentUpdateRequest, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            Long userId = user.getId();
            if(this.commentServiceImplementation.updateComment(id,commentUpdateRequest,userId)){
                return ResponseHandler.responseBuilder(201,"Bình luận đã được gửi",null,HttpStatus.CREATED);
            }
            throw new InternalServerErrorException("Server Error");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable @NotNull(message = "Hãy chọn bình luận") Long id,BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            return ParameterUtils.showBindingResult(bindingResult);
        }
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            Long userId = user.getId();
            if(this.commentServiceImplementation.deleteComment(id,userId)){
                return ResponseHandler.responseBuilder(200,"Bình luận đã được xóa",null,HttpStatus.OK);
            }
            throw new InternalServerErrorException("Server Error");
        }
        catch (Exception e){
            return ResponseHandler.exceptionBuilder(e);
        }
    }
}
