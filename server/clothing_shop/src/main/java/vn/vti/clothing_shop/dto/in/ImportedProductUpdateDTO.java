package vn.vti.clothing_shop.dto.in;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.constants.ClothGender;

import static vn.vti.clothing_shop.constants.RegularExpression.NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportedProductUpdateDTO {
    private Long id;
    private Long product_id;
    private ColorUpdateDTO color;
    private SizeUpdateDTO size;
    private MaterialUpdateDTO material;
    private ClothGender gender;
    private Integer importPrice;
    private Integer importNumber;
    private String imageUrl;
    private String slider_url_1;
    private String slider_url_2;
    private String slider_url_3;
    private String slider_url_4;
}
