package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.UserCreateDTO;
import vn.vti.clothing_shop.dto.in.UserReadDTO;
import vn.vti.clothing_shop.dto.in.UserUpdateDTO;
import vn.vti.clothing_shop.dto.in.UserUpdatePasswordDTO;
import vn.vti.clothing_shop.dto.out.UserDTO;
import vn.vti.clothing_shop.requests.UserCreateRequest;
import vn.vti.clothing_shop.requests.UserUpdatePasswordRequest;
import vn.vti.clothing_shop.requests.UserUpdateRequest;

import java.util.List;

@Component
public interface UserService {
    List<UserDTO> getAllUsers();
    String  getUser(UserReadDTO userReadDTO);
    Long countUser();
    UserDTO getUserById(Long id);
    Boolean addUser(UserCreateDTO userCreateDTO);
    Boolean updateUser(UserUpdateDTO userUpdateDTO);
    Boolean updateUserPassword(UserUpdatePasswordDTO userUpdatePasswordDTO);
    Boolean deleteUser(Long id);
}
