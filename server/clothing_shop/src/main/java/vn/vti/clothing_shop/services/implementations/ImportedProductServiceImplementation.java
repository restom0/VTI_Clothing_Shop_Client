package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dto.in.ImportedProductCreateDTO;
import vn.vti.clothing_shop.dto.in.ImportedProductUpdateDTO;
import vn.vti.clothing_shop.dto.out.ImportedProductDTO;
import vn.vti.clothing_shop.mappers.ColorMapper;
import vn.vti.clothing_shop.mappers.ImportedProductMapper;
import vn.vti.clothing_shop.mappers.MaterialMapper;
import vn.vti.clothing_shop.mappers.SizeMapper;
import vn.vti.clothing_shop.entities.*;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.*;
import vn.vti.clothing_shop.services.interfaces.ImportedProductService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImportedProductServiceImplementation implements ImportedProductService {

    private final ImportedProductRepository importedProductRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    private final MaterialRepository materialRepository;
    private final ImportedProductMapper importedProductMapper;
    private final ColorMapper colorMapper;
    private final SizeMapper sizeMapper;
    private final MaterialMapper materialMapper;

    @Autowired
    public ImportedProductServiceImplementation(ImportedProductRepository importedProductRepository, ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository, MaterialRepository materialRepository, ImportedProductMapper importedProductMapper, ColorMapper colorMapper, SizeMapper sizeMapper, MaterialMapper materialMapper) {
        this.importedProductRepository = importedProductRepository;
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.materialRepository = materialRepository;
        this.importedProductMapper = importedProductMapper;
        this.colorMapper = colorMapper;
        this.sizeMapper = sizeMapper;
        this.materialMapper = materialMapper;
    }

    public List<ImportedProductDTO> getAllImportedProducts() {
        return this.importedProductRepository
                .findAll()
                .stream()
                .map(importedProductMapper::EntityToDTO)
                .collect(Collectors.toList());
    }

    public Boolean addImportedProduct(ImportedProductCreateDTO importedProductCreateDTO) {
        Product product = productRepository
                .findById(importedProductCreateDTO.getProduct_id())
                .orElseThrow(()-> new NotFoundException("Product not found"));
        Color color = colorRepository
                .findByColor(importedProductCreateDTO.getColor().getColor_code())
                .orElseGet(() -> {
                    Color newColor = colorMapper.ColorCreateDTOToEntity(importedProductCreateDTO.getColor(), product.getCategory_id());
                    return colorRepository.save(newColor);
                });
        Size size = sizeRepository
                .findBySize(importedProductCreateDTO.getSize().getSize())
                .orElseGet(() -> {
                    Size newSize = sizeMapper.SizeCreateDTOToEntity(importedProductCreateDTO.getSize(), product.getCategory_id());
                    return sizeRepository.save(newSize);
                });
        Material material = materialRepository
                .findByName(importedProductCreateDTO.getMaterial().getName())
                .orElseGet(() -> {
                    Material newMaterial = materialMapper.MaterialCreateDTOToEntity(importedProductCreateDTO.getMaterial(), product.getCategory_id());
                    return materialRepository.save(newMaterial);
                });
        importedProductRepository.save(importedProductMapper.ImportedProductCreateDTOToEntity(importedProductCreateDTO, product, color, size, material));
        return true;
    }

    public Boolean deleteImportedProduct(Long id) {
        ImportedProduct importedProduct = importedProductRepository
                .findById(id)
                .orElseThrow(()-> new NotFoundException("Imported product not found"));
        importedProductRepository.delete(importedProduct);
        return true;
    }

    public Boolean updateImportedProduct(ImportedProductUpdateDTO importedProductUpdateDTO) {
        ImportedProduct importedProduct = importedProductRepository
                .findById(importedProductUpdateDTO.getId())
                .orElseThrow(()-> new NotFoundException("Imported product not found"));
        Product product = productRepository
                .findById(importedProductUpdateDTO.getProduct_id())
                .orElseThrow(()-> new NotFoundException("Product not found"));
        Color color = colorRepository
                .findById(importedProductUpdateDTO.getColor().getId())
                .orElseThrow(()-> new NotFoundException("Color not found"));
        Size size = sizeRepository
                .findById(importedProductUpdateDTO.getSize().getId())
                .orElseThrow(()-> new NotFoundException("Size not found"));
        Material material = materialRepository
                .findById(importedProductUpdateDTO.getMaterial().getId())
                .orElseThrow(()-> new NotFoundException("Material not found"));
        importedProductRepository.save(importedProductMapper
                .ImportedProductUpdateDTOToEntity(
                        importedProduct,
                        importedProductUpdateDTO,
                        product,
                        this.colorRepository
                                .save(colorMapper
                                        .ColorUpdateDTOToEntity(importedProductUpdateDTO.getColor(), color)),
                        this.sizeRepository
                                .save(sizeMapper
                                        .SizeUpdateDTOToEntity(importedProductUpdateDTO.getSize(), size)),
                        this.materialRepository
                                .save(materialMapper
                                        .MaterialUpdateDTOToEntity(importedProductUpdateDTO.getMaterial(), material))));
        return true;
    }

    public ImportedProductDTO getImportedProductById(Long id) {
        return importedProductMapper
                .EntityToDTO(importedProductRepository
                        .findById(id)
                        .orElseThrow(()-> new NotFoundException("Imported product not found")));
    }

    public List<ImportedProductDTO> getImportedProductByFilter(Filter filter, Long id) {
        if (filter == Filter.PRODUCTS) {
            return this.getAllImportedProducts();
        } else if (filter == Filter.PRODUCT) {
            return importedProductRepository
                    .findByProductId(id)
                    .stream()
                    .map(importedProductMapper::EntityToDTO)
                    .collect(Collectors.toList());
        } else if (filter == Filter.CATEGORY) {
            return importedProductRepository
                    .findByCategoryId(id)
                    .stream()
                    .map(importedProductMapper::EntityToDTO)
                    .collect(Collectors.toList());
        } else if (filter == Filter.BRAND) {
            return importedProductRepository
                    .findByBrandId(id)
                    .stream()
                    .map(importedProductMapper::EntityToDTO)
                    .collect(Collectors.toList());
        }
        throw new BadRequestException("Invalid filter");
    }
}
