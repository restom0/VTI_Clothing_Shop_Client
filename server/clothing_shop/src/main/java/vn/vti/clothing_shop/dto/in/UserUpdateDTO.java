package vn.vti.clothing_shop.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.constants.UserGender;

import java.time.LocalDate;

import static vn.vti.clothing_shop.constants.RegularExpression.EMAIL;
import static vn.vti.clothing_shop.constants.RegularExpression.PHONE_NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
    private Long id;
    private String name;
    private String email;
    private String phone_number;
    private String address;
    private LocalDate birthday;
    private String avatar_url;
    private UserGender gender;
}
