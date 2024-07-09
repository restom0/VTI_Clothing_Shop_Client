package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dto.in.ImportedProductCreateRequest;
import vn.vti.clothing_shop.dto.in.ImportedProductUpdateRequest;
import vn.vti.clothing_shop.entities.ImportedProduct;

import java.util.List;

public interface ImportedProductService {
    List<ImportedProduct> getAllImportedProducts();
    Boolean addImportedProduct(ImportedProductCreateRequest importedProductCreateRequest);
    Boolean deleteImportedProduct(Long id);
    Boolean updateImportedProduct(ImportedProductUpdateRequest importedProductUpdateRequest, Long id);
    ImportedProduct getImportedProductById(Long id);
    List<ImportedProduct> getImportedProductByFilter(Filter filter, Long id);
}
