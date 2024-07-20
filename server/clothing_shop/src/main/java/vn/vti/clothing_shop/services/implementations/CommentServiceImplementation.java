package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.dto.in.CommentCreateDTO;
import vn.vti.clothing_shop.dto.in.CommentUpdateDTO;
import vn.vti.clothing_shop.dto.out.CommentDTO;
import vn.vti.clothing_shop.mappers.CommentMapper;
import vn.vti.clothing_shop.mappers.ProductMapper;
import vn.vti.clothing_shop.mappers.UserMapper;
import vn.vti.clothing_shop.requests.CommentCreateRequest;
import vn.vti.clothing_shop.requests.CommentUpdateRequest;
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
import java.util.stream.Collectors;

@Service
public class CommentServiceImplementation implements CommentService {

    private final CommentRepository commentRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;
    private final CommentMapper commentMapper;
    private final UserMapper userMapper;

    @Autowired
    public CommentServiceImplementation(CommentRepository commentRepository, ProductRepository productRepository, UserRepository userRepository, ProductMapper productMapper, CommentMapper commentMapper, UserMapper userMapper) {
        this.commentRepository = commentRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productMapper = productMapper;
        this.commentMapper = commentMapper;
        this.userMapper = userMapper;
    }

    public List<CommentDTO> getAllComments(){
        return this.commentRepository.findAll().stream()
                .map(this.commentMapper::EntityToDTO)
                .collect(Collectors.toList());
    };
    public List<CommentDTO> getCommentById(Long product_id){
        return commentRepository.findByProductId(product_id).stream()
                .map(this.commentMapper::EntityToDTO)
                .collect(Collectors.toList());
    };
    public Boolean createComment(Long user_id, CommentCreateDTO commentCreateDTO){
        Product product = this.productRepository.findById(commentCreateDTO.getProduct_id()).orElseThrow(()->new NotFoundException("Product not found"));
        User user = this.userRepository.findById(user_id).orElseThrow(()->new NotFoundException("User not found"));
        this.commentRepository.save(this.commentMapper.CommentCreateDTOToEntity(commentCreateDTO,user,product));
        return true;
    };
    public Boolean updateComment(Long id, Long user_id, CommentUpdateDTO commentUpdateDTO){
        Comment comment= this.commentRepository.findByProductIdAndId(id,commentUpdateDTO.getId(),user_id)
                .orElseThrow(()->new NotFoundException("Comment not found"));
        this.commentRepository.save(this.commentMapper.CommentUpdateDTOToEntity(commentUpdateDTO,comment));
        return true;
    };
    public Boolean deleteComment(Long id){
        Comment comment = this.commentRepository.findById(id).orElseThrow(()->new NotFoundException("Comment not found"));
        comment.setDeleted_at(LocalDateTime.now());
        this.commentRepository.save(comment);
        return true;
    };
}


