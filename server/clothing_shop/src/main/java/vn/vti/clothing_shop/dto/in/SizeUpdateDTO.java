package vn.vti.clothing_shop.dto.in;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SizeUpdateDTO {
    private Long id;
    private String size;
    private String height;
    private String weight;
}
