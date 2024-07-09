package vn.vti.clothing_shop.dto.in;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.constants.PaymentStatus;

import static vn.vti.clothing_shop.constants.RegularExpression.BOOLEAN;
import static vn.vti.clothing_shop.constants.RegularExpression.PHONE_NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderUpdateRequest {

    private String address;

    @Pattern(regexp= PHONE_NUMBER,message = "Invalid phone number")
    private String phone_number;

    private String receiver_name;

    private String payment_status;
}
