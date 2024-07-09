package vn.vti.clothing_shop.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static vn.vti.clothing_shop.constants.RegularExpression.STAR_RATING;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentUpdateRequest {
    @NotNull(message = "Vui lòng chọn sản phẩm")
    @NotBlank(message = "Vui lòng chọn sản phẩm")
    private Long product_id;

    @NotNull(message = "Vui lòng nhập nội dung")
    @NotBlank(message = "Vui lòng nhập nội dung")
    private String content;

    @Pattern(regexp = STAR_RATING, message = "Số sao không hợp lệ")
    @NotBlank(message = "Vui lòng nhập đánh giá")
    @NotNull(message = "Vui lòng nhập đánh giá")
    private Float star;
}
