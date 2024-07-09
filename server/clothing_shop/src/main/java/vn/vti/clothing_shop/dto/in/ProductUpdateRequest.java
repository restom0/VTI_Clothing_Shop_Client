package vn.vti.clothing_shop.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.entities.Brand;
import vn.vti.clothing_shop.entities.Category;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpdateRequest {
    @NotNull(message = "Name is required")
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
