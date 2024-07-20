package vn.vti.clothing_shop.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dtos.ins.ImportedProductCreateDTO;
import vn.vti.clothing_shop.dtos.ins.ImportedProductUpdateDTO;
import vn.vti.clothing_shop.dtos.outs.ImportedProductDTO;
import vn.vti.clothing_shop.entities.*;
import vn.vti.clothing_shop.requests.ImportedProductCreateRequest;
import vn.vti.clothing_shop.requests.ImportedProductUpdateRequest;

@Component
public class ImportedProductMapper {

    private final ModelMapper mapper;
    private final ProductMapper productMapper;
    private final ColorMapper colorMapper;
    private final SizeMapper sizeMapper;
    private final MaterialMapper materialMapper;

    @Autowired
    public ImportedProductMapper(ModelMapper mapper, ProductMapper productMapper, ColorMapper colorMapper, SizeMapper sizeMapper, MaterialMapper materialMapper) {
        this.mapper = mapper;
        this.productMapper = productMapper;
        this.colorMapper = colorMapper;
        this.sizeMapper = sizeMapper;
        this.materialMapper = materialMapper;
    }

    public ImportedProductDTO EntityToDTO(ImportedProduct importedProduct) {
        ImportedProductDTO importedProductDTO = mapper.map(importedProduct, ImportedProductDTO.class);
        importedProductDTO.setProduct_id(productMapper.EntityToDTO(importedProduct.getProduct_id()));
        importedProductDTO.setColor_id(colorMapper.EntityToDTO(importedProduct.getColor_id()));
        importedProductDTO.setSize_id(sizeMapper.EntityToDTO(importedProduct.getSize_id()));
        importedProductDTO.setMaterial_id(materialMapper.EntityToDTO(importedProduct.getMaterial_id()));
        return importedProductDTO;
    }

    public ImportedProductCreateDTO ImportedProductCreateRequestToImportedProductCreateDTO(ImportedProductCreateRequest importedProductCreateRequest){
        return mapper.map(importedProductCreateRequest, ImportedProductCreateDTO.class);
    }

    public ImportedProduct ImportedProductCreateDTOToEntity(ImportedProductCreateDTO importedProductCreateDTO, Product product, Color color, Size size, Material material){
        ImportedProduct importedProduct = mapper.map(importedProductCreateDTO, ImportedProduct.class);
        importedProduct.setProduct_id(product);
        importedProduct.setColor_id(color);
        importedProduct.setSize_id(size);
        importedProduct.setMaterial_id(material);
        importedProduct.setSku(product.getId() + "-" + color.getId() + "-" + size.getId() + "-" + material.getId());
        importedProduct.setStock(importedProductCreateDTO.getImportNumber());
        return importedProduct;
    }

    public ImportedProductUpdateDTO ImportedProductUpdateRequestToImportedProductUpdateDTO(ImportedProductUpdateRequest importedProductUpdateRequest, Long id){
        ImportedProductUpdateDTO importedProductUpdateDTO = mapper.map(importedProductUpdateRequest, ImportedProductUpdateDTO.class);
        importedProductUpdateDTO.setId(id);
        return importedProductUpdateDTO;
    }
    public ImportedProduct ImportedProductUpdateDTOToEntity(ImportedProduct importedProduct, ImportedProductUpdateDTO importedProductUpdateDTO, Product product, Color color, Size size, Material material){
        importedProduct.setProduct_id(product);
        importedProduct.setColor_id(color);
        importedProduct.setSize_id(size);
        importedProduct.setMaterial_id(material);
        importedProduct.setSku(product.getId() + "-" + color.getId() + "-" + size.getId() + "-" + material.getId());
        importedProduct.setGender(importedProductUpdateDTO.getGender());
        importedProduct.setImageUrl(importedProductUpdateDTO.getImageUrl());
        importedProduct.setSlider_url_1(importedProductUpdateDTO.getSlider_url_1());
        importedProduct.setSlider_url_2(importedProductUpdateDTO.getSlider_url_2());
        importedProduct.setSlider_url_3(importedProductUpdateDTO.getSlider_url_3());
        importedProduct.setSlider_url_4(importedProductUpdateDTO.getSlider_url_4());
        importedProduct.setStock(importedProduct.getStock()+importedProductUpdateDTO.getImportNumber()-importedProduct.getImportNumber());
        importedProduct.setImportNumber(importedProductUpdateDTO.getImportNumber());
        importedProduct.setImportPrice(importedProductUpdateDTO.getImportPrice());
        return importedProduct;
    }
}
