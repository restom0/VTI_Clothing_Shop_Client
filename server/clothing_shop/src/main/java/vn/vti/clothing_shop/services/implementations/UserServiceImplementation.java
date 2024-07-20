package vn.vti.clothing_shop.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.UserCreateDTO;
import vn.vti.clothing_shop.dto.in.UserReadDTO;
import vn.vti.clothing_shop.dto.in.UserUpdateDTO;
import vn.vti.clothing_shop.dto.in.UserUpdatePasswordDTO;
import vn.vti.clothing_shop.dto.out.UserDTO;
import vn.vti.clothing_shop.mappers.UserMapper;
import vn.vti.clothing_shop.requests.UserCreateRequest;
import vn.vti.clothing_shop.requests.UserUpdatePasswordRequest;
import vn.vti.clothing_shop.requests.UserUpdateRequest;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.UserRepository;
import vn.vti.clothing_shop.services.JwtService;
import vn.vti.clothing_shop.services.interfaces.UserService;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class UserServiceImplementation implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserServiceImplementation(JwtService jwtService, UserRepository userRepository, UserMapper userMapper,PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }
    public List<UserDTO> getAllUsers(){
        return userMapper.EntityToDTO(userRepository.findAll());
    };
    public String getUser(UserReadDTO userReadDTO){
        User user = userReadDTO.getUsername()!=null ?
                this.userRepository
                        .findByUsername(userReadDTO.getUsername())
                        .orElseThrow(()->new NotFoundException("Người dùng không tồn tại"))
                :(
                        userReadDTO.getEmail()!=null ?
                                this.userRepository
                                        .findByEmail(userReadDTO.getEmail())
                                        .orElseThrow(()->new NotFoundException("Người dùng không tồn tại")) :
                        this.userRepository
                                .findByPhoneNumber(userReadDTO.getPhone_number())
                                .orElseThrow(()->new NotFoundException("Người dùng không tồn tại"))
                );
        return userMapper.ReadDTOToEntity(user,userReadDTO) ? jwtService.generateToken(user) : null;
    }
    public Boolean addUser(UserCreateDTO userCreateDTO){
        this.userRepository.findByUsername(userCreateDTO.getUsername()).ifPresent(u->{throw new BadRequestException("Tên đăng nhập đã tồn tại");});
        this.userRepository.findByEmail(userCreateDTO.getEmail()).ifPresent(u->{throw new BadRequestException("Email đã tồn tại");});
        this.userRepository.findByPhoneNumber(userCreateDTO.getPhone_number()).ifPresent(u->{throw new BadRequestException("Số điện thoại đã tồn tại");});
        userRepository.save(userMapper.createNormalUser(userCreateDTO));
        return true;
    }

    public Long countUser(){
        return userRepository.count();
    };

    public UserDTO getUserById(Long id){
        return userMapper.EntityToDTO(userRepository.findById(id).orElseThrow(()->new NotFoundException("Người dùng không tồn tại")));
    };
    public Boolean updateUser(UserUpdateDTO userUpdateDTO){
        User user = this.userRepository.findById(userUpdateDTO.getId()).orElseThrow(()->new NotFoundException("Người dùng không tồn tại"));
        this.userRepository
                .findByEmail(userUpdateDTO.getEmail())
                .ifPresent(u->{
                    if(!Objects.equals(u.getEmail(),user.getEmail()))
                        throw new BadRequestException("Email đã tồn tại");
                });
        this.userRepository
                .findByPhoneNumber(userUpdateDTO.getPhone_number())
                .ifPresent(u->{
                    if(!Objects.equals(u.getPhone_number(),user.getPhone_number()))
                        throw new BadRequestException("Số điện thoại đã tồn tại");
                });
        this.userRepository.save(userMapper.UpdateDTOToEntity(user,userUpdateDTO));
        return true;
    }
    public Boolean updateUserPassword(UserUpdatePasswordDTO userUpdatePasswordDTO){
        User user = this.userRepository
                .findById(userUpdatePasswordDTO.getId())
                .orElseThrow(()->new NotFoundException("Người dùng không tồn tại"));
        this.userRepository.save(userMapper.UpdatePasswordDTOToEntity(user,userUpdatePasswordDTO));
        return true;
    };
    public Boolean deleteUser(Long id){
        User user = this.userRepository.findById(id).orElseThrow(()->new NotFoundException("Người dùng không tồn tại"));
        user.setDeleted_at(LocalDateTime.now());
        this.userRepository.save(user);
        return true;
    };
}
