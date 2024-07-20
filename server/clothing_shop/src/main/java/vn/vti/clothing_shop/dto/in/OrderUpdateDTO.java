package vn.vti.clothing_shop.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.constants.PaymentMethod;

import static vn.vti.clothing_shop.constants.RegularExpression.BOOLEAN;
import static vn.vti.clothing_shop.constants.RegularExpression.PHONE_NUMBER;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderUpdateDTO {
    private Long id;
    private String address;
    private String phone_number;
    private String receiver_name;
    private Boolean isPresent;
    private PaymentMethod payment_method;
    private Long voucherId;
}
