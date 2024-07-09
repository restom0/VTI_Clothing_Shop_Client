package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.dto.in.CommentCreateRequest;
import vn.vti.clothing_shop.dto.in.CommentUpdateRequest;
import vn.vti.clothing_shop.entities.Comment;
import vn.vti.clothing_shop.entities.Email;
import vn.vti.clothing_shop.entities.Product;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.NotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CommentService {
    public List<Comment> getAllComments();
    public List<Comment> getCommentById(Long product_id);
    public Boolean createComment(CommentCreateRequest commentCreateRequest, Long user_id);
    public Boolean updateComment(Long id, CommentUpdateRequest commentUpdateRequest, Long user_id);
    public Boolean deleteComment(Long id,Long user_id);
}
