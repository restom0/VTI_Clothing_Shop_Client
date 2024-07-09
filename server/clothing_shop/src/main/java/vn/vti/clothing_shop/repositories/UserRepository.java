package vn.vti.clothing_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query("SELECT u FROM User u WHERE u.username = ?1 AND u.deleted_at IS NULL")
    User findByUsername(String username);
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.deleted_at IS NULL")
    User findByEmail(String email);
    @Query("SELECT u FROM User u WHERE u.phone_number = ?1 AND u.deleted_at IS NULL")
    User findByPhoneNumber(String phone_number);
}
