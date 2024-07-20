package vn.vti.clothing_shop.services.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dto.out.OnSaleProductDTO;
import vn.vti.clothing_shop.entities.OnSaleProduct;

import java.util.List;

public interface OnSaleProductService {
    List<OnSaleProductDTO> getAllOnSaleProducts();
    OnSaleProductDTO getOnSaleProductById(Long id);
}
