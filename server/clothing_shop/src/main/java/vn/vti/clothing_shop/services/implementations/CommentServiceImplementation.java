package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.CommentCreateRequest;
import vn.vti.clothing_shop.dto.in.CommentUpdateRequest;
import vn.vti.clothing_shop.entities.Comment;
import vn.vti.clothing_shop.entities.Product;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.CommentRepository;
import vn.vti.clothing_shop.repositories.ProductRepository;
import vn.vti.clothing_shop.repositories.UserRepository;
import vn.vti.clothing_shop.services.interfaces.CommentService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class CommentServiceImplementation implements CommentService {
    @Autowired
    private final CommentRepository commentRepository;

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final UserRepository userRepository;

    public CommentServiceImplementation(CommentRepository commentRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<Comment> getAllComments(){
        return commentRepository.findAll();
    };
    public List<Comment> getCommentById(Long product_id){
        return commentRepository.findByProductId(product_id);
    };
    public Boolean createComment(CommentCreateRequest commentCreateRequest,Long user_id){
        Product product = this.productRepository.findById(commentCreateRequest.getProduct_id()).orElse(null);
        User user = this.userRepository.findById(user_id).orElse(null);
        if(product==null){
            throw new NotFoundException("Product not found");
        }
        if(user==null){
            throw new NotFoundException("User not found");
        }
        Comment comment = new Comment();
        comment.setProduct_id(product);
        comment.setContent(commentCreateRequest.getContent());
        comment.setStar(commentCreateRequest.getStar());
        comment.setStatus(commentCreateRequest.getStar() >= 2.5);
        comment.setUser_id(user);
        this.commentRepository.save(comment);
        return true;
    };
    public Boolean updateComment(Long id, CommentUpdateRequest commentUpdateRequest, Long user_id){
        Optional<Comment> comment= this.commentRepository.findByProductIdAndId(id,commentUpdateRequest.getProduct_id(),user_id);
        if(comment.isEmpty()){
            throw new NotFoundException("Comment not found");
        }
        Comment newComment=comment.get();
        newComment.setContent(commentUpdateRequest.getContent());
        newComment.setStar(commentUpdateRequest.getStar());
        newComment.setStatus(commentUpdateRequest.getStar()>=2.5);
        return true;
    };
    public Boolean deleteComment(Long id,Long user_id){
        Optional<Comment> comment = this.commentRepository.findByUserIdAndId(id,user_id);
        if(comment.isEmpty()){
            throw new NotFoundException("Comment not found");
        }
        Comment newComment = comment.get();
        newComment.setDeleted_at(LocalDateTime.now());
        return true;
    };
}


