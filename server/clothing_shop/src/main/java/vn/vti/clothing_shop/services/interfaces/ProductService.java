package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.ProductCreateDTO;
import vn.vti.clothing_shop.dto.in.ProductUpdateDTO;
import vn.vti.clothing_shop.dto.out.ProductDTO;
import vn.vti.clothing_shop.requests.ProductCreateRequest;
import vn.vti.clothing_shop.requests.ProductUpdateRequest;
import vn.vti.clothing_shop.entities.Product;

import java.util.List;

@Component
public interface ProductService {
    public List<ProductDTO> getAllProducts();
    public Boolean addProduct(ProductCreateDTO productCreateDTO);
    public Boolean deleteProduct(Long id);
    public Boolean updateProduct(ProductUpdateDTO productUpdateDTO);
    public ProductDTO getProductById(Long id);
}
