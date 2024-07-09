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
import java.time.LocalDateTime;

import static vn.vti.clothing_shop.constants.RegularExpression.EMAIL;
import static vn.vti.clothing_shop.constants.RegularExpression.PHONE_NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    @NotNull(message = "Name is required")
    @NotBlank(message = "Name is required")
    private String name;

    @Pattern(regexp = EMAIL,message = "Invalid email")
    private String email;

    @NotNull(message = "Phone number is required")
    @Pattern(regexp = PHONE_NUMBER,message = "Invalid phone number")
    private String phone_number;

    private String address;

    private LocalDate birthday;

    private String avatar_url;

    @NotNull(message = "Gender is required")
    private UserGender gender;
}
