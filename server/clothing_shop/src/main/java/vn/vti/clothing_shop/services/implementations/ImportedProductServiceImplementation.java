package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dto.in.ImportedProductCreateRequest;
import vn.vti.clothing_shop.dto.in.ImportedProductUpdateRequest;
import vn.vti.clothing_shop.entities.*;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.*;
import vn.vti.clothing_shop.services.interfaces.ImportedProductService;

import java.util.List;
import java.util.Optional;

@Component
public class ImportedProductServiceImplementation implements ImportedProductService {
    @Autowired
    private final ImportedProductRepository importedProductRepository;

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final ColorRepository colorRepository;

    @Autowired
    private final SizeRepository sizeRepository;

    @Autowired
    private final TypeRepository typeRepository;

    @Autowired
    private final MaterialRepository materialRepository;

    public ImportedProductServiceImplementation(ImportedProductRepository importedProductRepository, ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository, TypeRepository typeRepository, MaterialRepository materialRepository) {
        this.importedProductRepository = importedProductRepository;
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.typeRepository = typeRepository;
        this.materialRepository = materialRepository;
    }

    public List<ImportedProduct> getAllImportedProducts() {
        return this.importedProductRepository.findAll();
    }

    public Boolean addImportedProduct(ImportedProductCreateRequest importedProductCreateRequest) {
        Product product = productRepository.findById(importedProductCreateRequest.getProduct_id()).orElse(null);
        if (product == null) {
            throw new NotFoundException("Product not found");
        }
        if (colorRepository.findByColor(importedProductCreateRequest.getColor_code()).isEmpty()) {
            Color newColor = new Color();
            newColor.setColor(importedProductCreateRequest.getColor_code());
            newColor.setName(importedProductCreateRequest.getColor_name());
            newColor.setCategory_id(product.getCategory_id());
            colorRepository.save(newColor);
        }
        Optional<Color> color = colorRepository.findByColor(importedProductCreateRequest.getColor_code());

        if (sizeRepository.findBySize(importedProductCreateRequest.getSize()).isEmpty()) {
            Size newSize = new Size();
            newSize.setSize(importedProductCreateRequest.getSize());
            newSize.setHeight(importedProductCreateRequest.getHeight());
            newSize.setWeight(importedProductCreateRequest.getWeight());
            newSize.setCategory_id(product.getCategory_id());
            sizeRepository.save(newSize);
        }
        Optional<Size> size = sizeRepository.findBySize(importedProductCreateRequest.getSize());

        if (typeRepository.findByName(importedProductCreateRequest.getType()).isEmpty()) {
            Type newType = new Type();
            newType.setName(importedProductCreateRequest.getType());
            newType.setCategory_id(product.getCategory_id());
            typeRepository.save(newType);
        }
        Optional<Type> type = typeRepository.findByName(importedProductCreateRequest.getSize());

        if (materialRepository.findByName(importedProductCreateRequest.getMaterial()).isEmpty()) {
            Material newMaterial = new Material();
            newMaterial.setName(importedProductCreateRequest.getMaterial());
            newMaterial.setCategory_id(product.getCategory_id());
            materialRepository.save(newMaterial);
        }
        Optional<Material> material = materialRepository.findByName(importedProductCreateRequest.getMaterial());
        if (color.isEmpty() || size.isEmpty() || type.isEmpty() || material.isEmpty()) {
            throw new BadRequestException("Invalid data");
        }
        String sku = product.getId() + "-" + color.get().getId() + "-" + size.get().getId() + "-" + type.get().getId() + "-" + material.get().getId();
        ImportedProduct importedProduct = new ImportedProduct();
        importedProduct.setProduct_id(product);
        importedProduct.setSize_id(size.get());
        importedProduct.setColor_id(color.get());
        importedProduct.setType_id(type.get());
        importedProduct.setMaterial_id(material.get());
        importedProduct.setSku(sku);
        importedProduct.setGender(importedProductCreateRequest.getGender());
        importedProduct.setStock(importedProductCreateRequest.getStock());
        importedProduct.setImportPrice(importedProductCreateRequest.getImportPrice());
        importedProductRepository.save(importedProduct);
        return true;
    }

    public Boolean deleteImportedProduct(Long id) {
        return null;
    }

    public Boolean updateImportedProduct(ImportedProductUpdateRequest importedProductUpdateRequest, Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            throw new NotFoundException("Product not found");
        }
        if (colorRepository.findByColor(importedProductUpdateRequest.getColor_code()).isEmpty()) {
            Color newColor = new Color();
            newColor.setColor(importedProductUpdateRequest.getColor_code());
            newColor.setName(importedProductUpdateRequest.getColor_name());
            newColor.setCategory_id(product.getCategory_id());
            colorRepository.save(newColor);
        }
        Optional<Color> color = colorRepository.findByColor(importedProductUpdateRequest.getColor_code());

        if (sizeRepository.findBySize(importedProductUpdateRequest.getSize()).isEmpty()) {
            Size newSize = new Size();
            newSize.setSize(importedProductUpdateRequest.getSize());
            newSize.setHeight(importedProductUpdateRequest.getHeight());
            newSize.setWeight(importedProductUpdateRequest.getWeight());
            newSize.setCategory_id(product.getCategory_id());
            sizeRepository.save(newSize);
        }
        Optional<Size> size = sizeRepository.findBySize(importedProductUpdateRequest.getSize());

        if (typeRepository.findByName(importedProductUpdateRequest.getType()).isEmpty()) {
            Type newType = new Type();
            newType.setName(importedProductUpdateRequest.getType());
            newType.setCategory_id(product.getCategory_id());
            typeRepository.save(newType);
        }
        Optional<Type> type = typeRepository.findByName(importedProductUpdateRequest.getSize());

        if (materialRepository.findByName(importedProductUpdateRequest.getMaterial()).isEmpty()) {
            Material newMaterial = new Material();
            newMaterial.setName(importedProductUpdateRequest.getMaterial());
            newMaterial.setCategory_id(product.getCategory_id());
            materialRepository.save(newMaterial);
        }
        Optional<Material> material = materialRepository.findByName(importedProductUpdateRequest.getMaterial());
        if (color.isEmpty() || size.isEmpty() || type.isEmpty() || material.isEmpty()) {
            throw new BadRequestException("Invalid data");
        }
        String sku = product.getId() + "-" + color.get().getId() + "-" + size.get().getId() + "-" + type.get().getId() + "-" + material.get().getId();
        ImportedProduct importedProduct = new ImportedProduct();
        importedProduct.setProduct_id(product);
        importedProduct.setSize_id(size.get());
        importedProduct.setColor_id(color.get());
        importedProduct.setType_id(type.get());
        importedProduct.setMaterial_id(material.get());
        importedProduct.setSku(sku);
        importedProduct.setGender(importedProductUpdateRequest.getGender());
        importedProduct.setImportPrice(importedProductUpdateRequest.getImportPrice());
        importedProduct.setStock(importedProductUpdateRequest.getStock());
        importedProductRepository.save(importedProduct);
        return true;
    }

    public ImportedProduct getImportedProductById(Long id) {
        if (importedProductRepository.findById(id).isEmpty()) {
            throw new NotFoundException("Imported product not found");
        }
        return importedProductRepository.findById(id).get();
    }

    public List<ImportedProduct> getImportedProductByFilter(Filter filter, Long id) {
        if (filter == Filter.PRODUCTS) {
            return importedProductRepository.findAll();
        } else if (filter == Filter.PRODUCT) {
            if (importedProductRepository.findByProductId(id).isEmpty()) {
                throw new NotFoundException("Imported product not found");
            }
            return List.of(importedProductRepository.findByProductId(id).get());
        } else if (filter == Filter.CATEGORY) {
            if (importedProductRepository.findByCategoryId(id).isEmpty()) {
                throw new NotFoundException("Imported product not found");
            }
            return List.of(importedProductRepository.findByCategoryId(id).get());
        } else if (filter == Filter.BRAND) {
            if (importedProductRepository.findByBrandId(id).isEmpty()) {
                throw new NotFoundException("Imported product not found");
            }
            return List.of(importedProductRepository.findByBrandId(id).get());
        }
        throw new BadRequestException("Invalid filter");
    }
}
