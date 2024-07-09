package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.UserCreateRequest;
import vn.vti.clothing_shop.dto.in.UserUpdateRequest;
import vn.vti.clothing_shop.dto.out.ErrorResponse;
import vn.vti.clothing_shop.dto.out.ResponseHandler;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.UserRepository;
import vn.vti.clothing_shop.services.JwtService;
import vn.vti.clothing_shop.services.interfaces.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class UserServiceImplementation implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final UserRepository userRepository;

    public UserServiceImplementation(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public String getUser(String username, String email, String phone_number, String password){
        try {
                User user = null;
                if(username != null){
                    user = this.userRepository.findByUsername(username);
                    if (user == null) {
                        throw new BadRequestException("Thông tin đăng nhập không chính xác");
                    }
                }
                if (email != null) {
                    user = this.userRepository.findByEmail(email);
                    if (user == null) {
                        throw new BadRequestException("Thông tin đăng nhập không chính xác");
                    }
                }
                if (phone_number != null) {
                    user = this.userRepository.findByPhoneNumber(phone_number);
                    if (user == null) throw new BadRequestException("Thông tin đăng nhập không chính xác");
                }
//                if(passwordEncoder.matches(user.password, password)){
                    return jwtService.generateToken(user);
                //}
                //else
                    //throw new BadRequestException("Thông tin đăng nhập không chính xác");

        }
        catch (Exception e) {
            throw new InternalServerErrorException("Server error");
        }
    };
    public Boolean addUser(UserCreateRequest user){
                User newUser = new User();
                newUser.setUsername(user.getUsername());
                newUser.setEmail(user.getEmail());
                newUser.setPhone_number(user.getPhone_number());
                newUser.setPassword(passwordEncoder.encode(user.getPassword()));
                newUser.setName(user.getName());
                newUser.setBirthday(user.getBirthday());
                newUser.setAvatar_url(user.getAvatar_url());
                newUser.setRole(user.getRole());
                newUser.setAddress(user.getAddress());
                newUser.setSalt(jwtService.generateSalt(this.countUser()));
                newUser.setGender(user.getGender());
                userRepository.save(newUser);
                return true;
    }
    public Long countUser(){
        return userRepository.count();
    };
    public Boolean updateUser(UserUpdateRequest user,Long id){
        try {
            Optional<User> userUpdateOptional = userRepository.findById(id);
            if (userUpdateOptional.isEmpty()) {
                throw new NotFoundException("Người dùng không tồn tại");
            } else {
                User userUpdate = userUpdateOptional.get();
                userUpdate.setName(user.getName());
                userUpdate.setBirthday(user.getBirthday());
                userUpdate.setAvatar_url(user.getAvatar_url());
                userUpdate.setAddress(user.getAddress());
                userUpdate.setGender(user.getGender());
                userRepository.save(userUpdate);
                return true;
            }
        }
        catch (Exception e) {
            throw new InternalServerErrorException("Server error");
        }
    }
    public Boolean updateUserPassword(String password,Long id){
        try {
            Optional<User> userUpdateOptional = userRepository.findById(id);
            if (userUpdateOptional.isEmpty()) {
                throw new NotFoundException("Người dùng không tồn tại");
            } else {
                User userUpdate = userUpdateOptional.get();
                userUpdate.setPassword(passwordEncoder.encode(password));
                userUpdate.setSalt(jwtService.generateSalt(this.countUser()));
                userRepository.save(userUpdate);
                return true;
            }
        }
        catch (Exception e) {
            throw new InternalServerErrorException("Server error");
        }

    };
    public Boolean deleteUser(Long id){
        try {
            Optional<User> userDeleteOptional = userRepository.findById(id);
            if (userDeleteOptional.isEmpty()) {
                throw new NotFoundException("Người dùng không tồn tại");
            } else {
                User userDelete = userDeleteOptional.get();
                if(userDelete.getDeleted_at() != null){
                    throw new NotFoundException("Người dùng không tồn tại");
                }
                userDelete.setDeleted_at(LocalDateTime.now());
                return true;
            }
        }
        catch (Exception e) {
            throw new InternalServerErrorException("Server error");
        }
    };
}
