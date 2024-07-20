package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dtos.ins.BrandCreateDTO;
import vn.vti.clothing_shop.dtos.ins.BrandUpdateDTO;
import vn.vti.clothing_shop.dtos.outs.BrandDTO;
import vn.vti.clothing_shop.responses.BrandResponse;

import java.util.List;

@Component
public interface BrandService {
    public List<BrandDTO> getAllBrands();
    public Boolean addBrand(BrandCreateDTO brandCreateDTO);
    public Boolean updateBrand(BrandUpdateDTO brandUpdateDTO);
    public Boolean deleteBrand(Long id);
    public BrandResponse getBrandById(Long id);
}
