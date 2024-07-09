package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.entities.OnSaleProduct;
import vn.vti.clothing_shop.repositories.OnSaleProductRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class OnSaleProductServiceImplementation {
    @Autowired
    private final OnSaleProductRepository onSaleProductRepository;

    public OnSaleProductServiceImplementation(OnSaleProductRepository onSaleProductRepository) {
        this.onSaleProductRepository = onSaleProductRepository;
    }

    //on sale product have like 2 situation: onsale with no end date and onsale with end date. Get list of all on sale products have the latest available date if there are not any other available date now  choose the lastest data with null end date
    public List<OnSaleProduct> getAllOnSaleProducts() {
        List<OnSaleProduct> onSaleProductsWithNullEndDate = this.onSaleProductRepository.findAllByNullEndDateAndAvailableDateAfterNow();
        List<OnSaleProduct> onSaleProductsWithEndDate = this.onSaleProductRepository.findAllByEndDateNotNullAndAvailableDateAfterNowAndEndDateBeforeNow();
        for (OnSaleProduct onSaleProduct : onSaleProductsWithEndDate) {
            for (OnSaleProduct onSaleProductWithNullEndDate : onSaleProductsWithNullEndDate) {
                if (Objects.equals(onSaleProductWithNullEndDate.getProduct_id().getId(), onSaleProduct.getProduct_id().getId())) {
                    if (onSaleProductWithNullEndDate.getAvailable_date().isBefore(onSaleProduct.getAvailable_date())) {
                        onSaleProductsWithNullEndDate.remove(onSaleProductWithNullEndDate);
                        break;
                    }
                }
            }
            onSaleProductsWithNullEndDate.add(onSaleProduct);
        }
        return onSaleProductsWithNullEndDate;
    }
    public OnSaleProduct getOnSaleProductById(Long id) {
        List<OnSaleProduct> onSaleProductsWithNullEndDate = this.onSaleProductRepository.findByIdAndNullEndDateAndAvailableDateAfterNow(id);
        List<OnSaleProduct> onSaleProductsWithEndDate = this.onSaleProductRepository.findByIdAndEndDateNotNullAndAvailableDateAfterNowAndEndDateBeforeNow(id);
        if (onSaleProductsWithEndDate.isEmpty() && onSaleProductsWithNullEndDate.isEmpty()) {
            return null;
        }
        else if (onSaleProductsWithEndDate.isEmpty()) {
            return onSaleProductsWithNullEndDate.get(onSaleProductsWithNullEndDate.size() - 1);
        }
        return onSaleProductsWithEndDate.get(onSaleProductsWithEndDate.size() - 1);
    }
}


