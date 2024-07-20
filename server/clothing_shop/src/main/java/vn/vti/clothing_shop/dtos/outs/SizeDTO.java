package vn.vti.clothing_shop.dtos.outs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SizeDTO {
    private Long id;

    private String size;

    private String height;

    private String weight;

    private CategoryDTO category_id;
}
