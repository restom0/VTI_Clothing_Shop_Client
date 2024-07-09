package vn.vti.clothing_shop.dto.in;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.constants.PaymentMethod;
import vn.vti.clothing_shop.constants.PaymentStatus;
import vn.vti.clothing_shop.entities.Voucher;

import static vn.vti.clothing_shop.constants.RegularExpression.BOOLEAN;
import static vn.vti.clothing_shop.constants.RegularExpression.PHONE_NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateRequest {

    private String address;

    @Pattern(regexp= PHONE_NUMBER,message = "Invalid phone number")
    private String phone_number;

    private String receiver_name;

    @NotNull(message = "isPresent is required")
    @Pattern(regexp = BOOLEAN,message = "Invalid isPresent")
    private boolean isPresent;

    @NotBlank(message = "payment_method is required")
    @Pattern(regexp = "COD|EBanking|MOMO",message = "Invalid payment_method")
    private String payment_method;

    private Long voucherId;
}
