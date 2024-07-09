package vn.vti.clothing_shop.services.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.entities.OnSaleProduct;

import java.util.List;

public interface OnSaleProductService extends JpaRepository<OnSaleProduct, Long>{
    List<OnSaleProduct> getAllOnSaleProducts();
    OnSaleProduct getOnSaleProductById(Long id);
    Boolean addOnSaleProduct(OnSaleProduct onSaleProduct, Filter filter);
    Boolean updateOnSaleProduct(OnSaleProduct onSaleProduct, Filter filter, Long id);
    Boolean deleteOnSaleProduct(Filter filter,Long id);
}
