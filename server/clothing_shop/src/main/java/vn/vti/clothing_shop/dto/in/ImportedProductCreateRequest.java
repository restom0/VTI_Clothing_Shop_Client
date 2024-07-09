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
import vn.vti.clothing_shop.constants.ClothGender;
import vn.vti.clothing_shop.entities.*;

import static vn.vti.clothing_shop.constants.RegularExpression.NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportedProductCreateRequest {
    @NotNull(message = "Product ID is required")
    @Pattern(regexp = NUMBER, message = "Product ID must be a number")
    private Long product_id;

    @NotNull(message = "Color code is required")
    @NotBlank(message = "Color code is required")
    private String color_code;

    @NotNull(message = "Color name is required")
    @NotBlank(message = "Color name is required")
    private String color_name;

    @NotNull(message = "Size is required")
    @NotBlank(message = "Size is required")
    private String size;

    @NotNull(message = "Height is required")
    @NotBlank(message = "Height is required")
    private String height;

    @NotNull(message = "Weight is required")
    @NotBlank(message = "Weight is required")
    private String weight;

    @NotNull(message = "Type is required")
    @NotBlank(message = "Type is required")
    private String type;

    @NotNull(message = "Material is required")
    @NotBlank(message = "Material is required")
    private String material;

    @NotNull(message = "Gender is required")
    @NotBlank(message = "Gender is required")
    private ClothGender gender;

    @NotNull(message = "Import price is required")
    @Pattern(regexp = NUMBER, message = "Import price must be a number")
    private Integer importPrice;

    @NotNull(message = "Stock is required")
    @Pattern(regexp = NUMBER, message = "Stock must be a number")
    private Integer stock;
}
