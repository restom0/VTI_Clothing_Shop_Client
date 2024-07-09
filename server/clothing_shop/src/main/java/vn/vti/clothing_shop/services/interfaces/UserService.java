package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.UserCreateRequest;
import vn.vti.clothing_shop.dto.in.UserUpdateRequest;
import vn.vti.clothing_shop.entities.User;

@Component
public interface UserService {
    String  getUser(String username, String email,String phone_number, String password);
    Long countUser();
    Boolean addUser(UserCreateRequest user);
    Boolean updateUser(UserUpdateRequest user,Long id);
    Boolean updateUserPassword(String password,Long id);
    Boolean deleteUser(Long id);
}
