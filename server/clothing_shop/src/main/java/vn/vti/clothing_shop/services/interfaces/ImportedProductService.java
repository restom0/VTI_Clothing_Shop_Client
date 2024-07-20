package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dtos.ins.ImportedProductCreateDTO;
import vn.vti.clothing_shop.dtos.ins.ImportedProductUpdateDTO;
import vn.vti.clothing_shop.dtos.outs.ImportedProductDTO;

import java.util.List;

public interface ImportedProductService {
    List<ImportedProductDTO> getAllImportedProducts();
    Boolean addImportedProduct(ImportedProductCreateDTO importedProductCreateDTO);
    Boolean deleteImportedProduct(Long id);
    Boolean updateImportedProduct(ImportedProductUpdateDTO importedProductUpdateDTO);
    ImportedProductDTO getImportedProductById(Long id);
    List<ImportedProductDTO> getImportedProductByFilter(Filter filter, Long id);
}
