package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.entities.Brand;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.BrandRepository;
import vn.vti.clothing_shop.services.interfaces.BrandService;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class BrandServiceImplementation implements BrandService {
    @Autowired
    private final BrandRepository brandRepository;

    public BrandServiceImplementation(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {
        return this.brandRepository.findAll();
    }

    public Boolean addBrand(String name) {
        Brand brand = new Brand();
        brand.setName(name);
        this.brandRepository.save(brand);
        return true;
    }

    public Boolean updateBrand(String name, Long id) {
        Brand brand = this.brandRepository.findById(id).orElse(null);
        if (brand == null) {
            throw new NotFoundException("Brand not found");
        }
        brand.setName(name);
        this.brandRepository.save(brand);
        return true;
    }
    public Boolean deleteBrand(Long id) {
        Brand brand = this.brandRepository.findById(id).orElse(null);
        if (brand == null) {
            throw new NotFoundException("Brand not found");
        }
        brand.setDeleted_at(LocalDateTime.now());
        this.brandRepository.save(brand);
        return true;
    }
}
