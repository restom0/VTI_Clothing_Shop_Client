package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dto.in.ImportedProductCreateDTO;
import vn.vti.clothing_shop.dto.in.ImportedProductUpdateDTO;
import vn.vti.clothing_shop.dto.out.ImportedProductDTO;
import vn.vti.clothing_shop.requests.ImportedProductCreateRequest;
import vn.vti.clothing_shop.requests.ImportedProductUpdateRequest;
import vn.vti.clothing_shop.entities.ImportedProduct;

import java.util.List;

public interface ImportedProductService {
    List<ImportedProductDTO> getAllImportedProducts();
    Boolean addImportedProduct(ImportedProductCreateDTO importedProductCreateDTO);
    Boolean deleteImportedProduct(Long id);
    Boolean updateImportedProduct(ImportedProductUpdateDTO importedProductUpdateDTO);
    ImportedProductDTO getImportedProductById(Long id);
    List<ImportedProductDTO> getImportedProductByFilter(Filter filter, Long id);
}
