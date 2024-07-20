package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.constants.Filter;
import vn.vti.clothing_shop.dto.out.OnSaleProductDTO;
import vn.vti.clothing_shop.entities.OnSaleProduct;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.mappers.OnSaleProductMapper;
import vn.vti.clothing_shop.repositories.OnSaleProductRepository;
import vn.vti.clothing_shop.services.interfaces.OnSaleProductService;

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

    public List<OnSaleProductDTO> getAllOnSaleProducts() {
        List<OnSaleProduct> NullEndDateOnSaleProducts = this.onSaleProductRepository.findAllAvailableByNullEnd();
        List<OnSaleProduct> EndDateOnSaleProducts = this.onSaleProductRepository.findAllAvailableByNotNullEnd();
        EndDateOnSaleProducts.forEach(EndDateOnSaleProduct -> {
            NullEndDateOnSaleProducts.forEach(NullEndDateOnSaleProduct->{
                if(!EndDateOnSaleProduct.getId().equals(NullEndDateOnSaleProduct.getId())){
                    NullEndDateOnSaleProducts.add(EndDateOnSaleProduct);
                }
            });
        });
        return this.onSaleProductMapper.EntityToDTO(NullEndDateOnSaleProducts);
    }
    public OnSaleProductDTO getOnSaleProductById(Long id) {
        OnSaleProduct onSaleProduct = this.onSaleProductRepository.findById(id).orElseThrow(()->new NotFoundException("OnSaleProduct not found"));
        return this.onSaleProductMapper.EntityToDTO(onSaleProduct);
    }
}


