package vn.vti.clothing_shop.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.dto.out.ProductDTO;
import vn.vti.clothing_shop.dto.out.UserDTO;

import static vn.vti.clothing_shop.constants.RegularExpression.STAR_RATING;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentUpdateDTO {
    private Long id;
    private UserDTO user_id;
    private ProductDTO product_id;
    private String content;
    private Boolean status;
    private Float star;
}
