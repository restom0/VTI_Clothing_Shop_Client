package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.dtos.outs.OnSaleProductDTO;
import vn.vti.clothing_shop.entities.OnSaleProduct;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.mappers.OnSaleProductMapper;
import vn.vti.clothing_shop.repositories.OnSaleProductRepository;
import vn.vti.clothing_shop.services.interfaces.OnSaleProductService;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;

import java.util.List;

@Service
public class OnSaleProductServiceImplementation implements OnSaleProductService {

    private final OnSaleProductRepository onSaleProductRepository;
    private final OnSaleProductMapper onSaleProductMapper;

    @Autowired
    public OnSaleProductServiceImplementation(OnSaleProductRepository onSaleProductRepository, OnSaleProductMapper onSaleProductMapper) {
        this.onSaleProductRepository = onSaleProductRepository;
        this.onSaleProductMapper = onSaleProductMapper;
    }

    //@Cacheable(value = "onSaleProducts")
    public List<OnSaleProductDTO> getAllOnSaleProducts() {
        List<OnSaleProduct> NullEndDateOnSaleProducts = this.onSaleProductRepository.findAllAvailableByNullEnd();
        List<OnSaleProduct> EndDateOnSaleProducts = this.onSaleProductRepository.findAllAvailableByNotNullEnd();

        Set<OnSaleProduct> mergedProducts = new HashSet<>(NullEndDateOnSaleProducts);
        mergedProducts.addAll(EndDateOnSaleProducts);

        List<OnSaleProduct> mergedProductList = new ArrayList<>(mergedProducts);
        return this.onSaleProductMapper.EntityToDTO(mergedProductList);
    }
    public OnSaleProductDTO getOnSaleProductById(Long id) {
        OnSaleProduct onSaleProduct = this.onSaleProductRepository.findById(id).orElseThrow(()->new NotFoundException("OnSaleProduct not found"));
        return this.onSaleProductMapper.EntityToDTO(onSaleProduct);
    }
}


