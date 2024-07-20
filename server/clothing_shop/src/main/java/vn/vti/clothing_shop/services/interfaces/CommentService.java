package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.dto.in.CommentCreateDTO;
import vn.vti.clothing_shop.dto.in.CommentUpdateDTO;
import vn.vti.clothing_shop.dto.out.CommentDTO;
import vn.vti.clothing_shop.requests.CommentCreateRequest;
import vn.vti.clothing_shop.requests.CommentUpdateRequest;
import vn.vti.clothing_shop.entities.Comment;

import java.util.List;

public interface CommentService {
    List<CommentDTO> getAllComments();
    List<CommentDTO> getCommentById(Long product_id);
    Boolean createComment(Long user_id, CommentCreateDTO commentCreateDTO);
    Boolean updateComment(Long id, Long user_id, CommentUpdateDTO commentUpdateDTO);
    Boolean deleteComment(Long id);
}
