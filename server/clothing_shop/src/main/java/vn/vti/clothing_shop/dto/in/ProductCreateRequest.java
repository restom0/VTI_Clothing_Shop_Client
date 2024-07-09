package vn.vti.clothing_shop.dto.in;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import vn.vti.clothing_shop.entities.Brand;
import vn.vti.clothing_shop.entities.Category;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {
    @NotNull(message = "Name is required")
    @NotBlank(message = "Name is required")
    private String name;

    private String short_description;

    private String imageUrl;

    private String slider_url_1;

    private String slider_url_2;

    private String slider_url_3;

    private String slider_url_4;

    @NotNull(message = "Category is required")
    @NotBlank(message = "Category is required")
    private Long category_id;

    @NotNull(message = "Brand is required")
    @NotBlank(message = "Brand is required")
    private Long brand_id;

}
