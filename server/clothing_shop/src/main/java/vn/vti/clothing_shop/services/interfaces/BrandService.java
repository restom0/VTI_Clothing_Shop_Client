package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.entities.Brand;

import java.util.List;

@Component
public interface BrandService {
    public List<Brand> getAllBrands();
    public Boolean addBrand(String name);
    public Boolean updateBrand(String name, Long id);
    public Boolean deleteBrand(Long id);
}
