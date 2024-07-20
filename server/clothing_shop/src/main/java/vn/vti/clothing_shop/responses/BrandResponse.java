package vn.vti.clothing_shop.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.vti.clothing_shop.dto.out.BrandDTO;
import vn.vti.clothing_shop.dto.out.ColorDTO;
import vn.vti.clothing_shop.dto.out.MaterialDTO;
import vn.vti.clothing_shop.dto.out.SizeDTO;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandResponse {
    private BrandDTO brandDTO;
    private List<ColorDTO> colorDTO;
    private List<SizeDTO> sizeDTO;
    private List<MaterialDTO> materialDTO;
}
