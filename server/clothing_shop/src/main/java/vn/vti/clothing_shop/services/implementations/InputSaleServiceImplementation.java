package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.dtos.ins.InputSaleCreateDTO;
import vn.vti.clothing_shop.dtos.ins.InputSaleUpdateDTO;
import vn.vti.clothing_shop.dtos.outs.InputSaleDTO;
import vn.vti.clothing_shop.dtos.outs.OnSaleProductDTO;
import vn.vti.clothing_shop.entities.ImportedProduct;
import vn.vti.clothing_shop.entities.InputSale;
import vn.vti.clothing_shop.entities.OnSaleProduct;
import vn.vti.clothing_shop.exceptions.ConflictException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.mappers.InputSaleMapper;
import vn.vti.clothing_shop.mappers.OnSaleProductMapper;
import vn.vti.clothing_shop.repositories.ImportedProductRepository;
import vn.vti.clothing_shop.repositories.InputSaleRepository;
import vn.vti.clothing_shop.repositories.OnSaleProductRepository;
import vn.vti.clothing_shop.services.interfaces.InputSaleService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class InputSaleServiceImplementation implements InputSaleService {
    private final InputSaleRepository inputSaleRepository;
    private final OnSaleProductRepository onSaleProductRepository;
    private final ImportedProductRepository importedProductRepository;
    private final InputSaleMapper inputSaleMapper;
    private final OnSaleProductMapper onSaleProductMapper;

    @Autowired
    public InputSaleServiceImplementation(InputSaleRepository inputSaleRepository, OnSaleProductRepository onSaleProductRepository, ImportedProductRepository importedProductRepository, InputSaleMapper inputSaleMapper, OnSaleProductMapper onSaleProductMapper, OnSaleProductServiceImplementation onSaleProductServiceImplementation) {
        this.inputSaleRepository = inputSaleRepository;
        this.onSaleProductRepository = onSaleProductRepository;
        this.importedProductRepository = importedProductRepository;
        this.inputSaleMapper = inputSaleMapper;
        this.onSaleProductMapper = onSaleProductMapper;
    }

    public List<OnSaleProductDTO> getOnSaleProductsByInputSaleId(Long id){
        return this.onSaleProductMapper.EntityToDTO(this.onSaleProductRepository.findByInputSaleId(id));
    }
    public List<InputSaleDTO> getAllInputSale(){
        List<InputSale> inputSales = inputSaleRepository.findAll();
        List<List<OnSaleProduct>> onSaleProducts = new ArrayList<>();
        inputSales.forEach(inputSale -> {
            onSaleProducts.add(onSaleProductRepository.findByInputSaleId(inputSale.getId()));
        });
        return inputSaleMapper.EntityToDTO(inputSaleRepository.findAll(),onSaleProducts);
    };
    public InputSaleDTO getInputSaleById(Long id){
        InputSale inputSale = inputSaleRepository.findById(id).orElseThrow(()->new NotFoundException("InputSale not found"));
        List<OnSaleProduct> onSaleProducts = onSaleProductRepository.findByInputSaleId(id);
        return inputSaleMapper.EntityToDTO(inputSale,onSaleProducts);
    };

    private Boolean isValidToSave(ImportedProduct importedProduct,InputSale inputSale){
        if(inputSale.getEnd_date() != null) {
            this.onSaleProductRepository
                    .findByProductIdAndAvailableDateAndNotNullEndDate(
                            importedProduct.getId(),
                            inputSale.getAvailable_date(),
                            inputSale.getEnd_date())
                    .ifPresent(onSaleProduct -> {
                        throw new ConflictException("Product is already on sale");
                    });
        }
        else {
            this.onSaleProductRepository
                    .findByProductIdAndAvailableDateAndNullEndDate(
                            importedProduct.getId(),
                            inputSale.getAvailable_date())
                    .ifPresent(onSaleProduct -> {
                        if(onSaleProduct.getInput_sale_id().getAvailable_date().isBefore(inputSale.getAvailable_date())){
                            onSaleProduct.getInput_sale_id().setEnd_date(LocalDateTime.now());
                            this.onSaleProductRepository.save(onSaleProduct);
                        }
                        else {
                            throw new ConflictException("Product is already on sale");
                        }
                    });
        }
        return true;
    }
    private void saveListOnSaleProduct(List<ImportedProduct> importedProducts,InputSale inputSale){
        if(importedProducts.isEmpty())  return;
        importedProducts.forEach(importedProduct -> {
            if(!isValidToSave(importedProduct,inputSale)) return;
            this.onSaleProductRepository.save(onSaleProductMapper.ImportProductToOnSaleProduct(importedProduct,inputSale));
        });
    }

    public  Boolean createInputSale(InputSaleCreateDTO inputSaleCreateDTO){
        InputSale inputSale = inputSaleMapper.CreateDTOToEntity(inputSaleCreateDTO);
        switch (inputSaleCreateDTO.getFilter()){
            case ALL:
                saveListOnSaleProduct(importedProductRepository.findAllWithPositiveStock(),inputSale);
                break;
            case PRODUCT:
                saveListOnSaleProduct(importedProductRepository.findAllWithPositiveStockByProductId(inputSaleCreateDTO.getFilter_id()),inputSale);
                break;
            case BRAND:
                saveListOnSaleProduct(importedProductRepository.findAllWithPositiveStockByBrandId(inputSaleCreateDTO.getFilter_id()),inputSale);
                break;
            case CATEGORY:
                saveListOnSaleProduct(importedProductRepository.findAllWithPositiveStockByCategoryId(inputSaleCreateDTO.getFilter_id()),inputSale);
                break;
            case COLOR:
                saveListOnSaleProduct(importedProductRepository.findAllWithPositiveStockByColorId(inputSaleCreateDTO.getFilter_id()),inputSale);
                break;
            case SIZE:
                saveListOnSaleProduct(importedProductRepository.findAllWithPositiveStockBySizeId(inputSaleCreateDTO.getFilter_id()),inputSale);
                break;
            case MATERIAL:
                saveListOnSaleProduct(importedProductRepository.findAllWithPositiveStockByMaterialId(inputSaleCreateDTO.getFilter_id()),inputSale);
                break;
        }
        this.inputSaleRepository.save(inputSale);
        return true;
    };
    private void updateListOnSaleProduct(List<OnSaleProduct> onSaleProducts,InputSale inputSale){
        if(onSaleProducts.isEmpty()) return;
        onSaleProducts.forEach(onSaleProduct -> {
            if(!isValidToSave(onSaleProduct.getProduct_id(),inputSale)) return;
            onSaleProduct.setSale_price(onSaleProduct.getSale_price()*inputSale.getSalePercentage());
            onSaleProduct.setDiscount(onSaleProduct.getDiscount()*inputSale.getDiscount());
            this.onSaleProductRepository.save(onSaleProduct);
        });
    }
    public Boolean updateInputSale(InputSaleUpdateDTO inputSaleUpdateDTO){
        InputSale inputSale = inputSaleRepository.findById(inputSaleUpdateDTO.getId()).orElseThrow(()->new NotFoundException("InputSale not found"));
        List<OnSaleProduct> onSaleProducts = onSaleProductRepository.findByInputSaleId(inputSale.getId());
        updateListOnSaleProduct(onSaleProducts,inputSale);
        inputSaleRepository.save(inputSaleMapper.UpdateDTOToEntity(inputSaleUpdateDTO,inputSale));
        return true;
    };
    public Boolean deleteInputSale(Long id){
        InputSale inputSale = inputSaleRepository.findById(id).orElseThrow(()->new RuntimeException("InputSale not found"));
        List<OnSaleProduct> onSaleProducts = onSaleProductRepository.findByInputSaleId(inputSale.getId());
        onSaleProducts.forEach(onSaleProduct -> {
            onSaleProduct.setDeleted_at(LocalDateTime.now());
            onSaleProductRepository.save(onSaleProduct);
        });
        inputSale.setDeleted_at(LocalDateTime.now());
        inputSaleRepository.save(inputSale);
        return true;
    };

}
