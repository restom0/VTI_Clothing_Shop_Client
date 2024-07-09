package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.ProductCreateRequest;
import vn.vti.clothing_shop.dto.in.ProductUpdateRequest;
import vn.vti.clothing_shop.entities.Product;

import java.util.List;

@Component
public interface ProductService {
    public List<Product> getAllProducts();
    public Boolean addProduct(ProductCreateRequest productCreateRequest);
    public Boolean deleteProduct(Long id);
    public Boolean updateProduct(ProductUpdateRequest productUpdateRequest,Long id);
    public Product getProductById(Long id);
}
