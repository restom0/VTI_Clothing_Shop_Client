package vn.vti.clothing_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.OnSaleProduct;

import java.util.List;
import java.util.Optional;

public interface OnSaleProductRepository extends JpaRepository<OnSaleProduct,Long> {
    @Query("SELECT onSaleProduct FROM OnSaleProduct onSaleProduct WHERE onSaleProduct.end_date IS NULL AND onSaleProduct.available_date >= CURRENT_TIMESTAMP AND onSaleProduct.deleted_at IS NULL")
    public List<OnSaleProduct> findAllByNullEndDateAndAvailableDateAfterNow();

    @Query("SELECT onSaleProduct FROM OnSaleProduct onSaleProduct WHERE onSaleProduct.end_date IS NOT NULL AND onSaleProduct.available_date >= CURRENT_TIMESTAMP AND onSaleProduct.end_date <= CURRENT_TIMESTAMP AND onSaleProduct.deleted_at IS NULL")
    public List<OnSaleProduct> findAllByEndDateNotNullAndAvailableDateAfterNowAndEndDateBeforeNow();

    @Query("SELECT onSaleProduct FROM OnSaleProduct onSaleProduct WHERE onSaleProduct.id = ?1 AND onSaleProduct.end_date IS NULL AND onSaleProduct.available_date >= CURRENT_TIMESTAMP AND onSaleProduct.deleted_at IS NULL")
    public List<OnSaleProduct> findByIdAndNullEndDateAndAvailableDateAfterNow(Long id);

    @Query("SELECT onSaleProduct FROM OnSaleProduct onSaleProduct WHERE onSaleProduct.id = ?1 AND onSaleProduct.end_date IS NOT NULL AND onSaleProduct.available_date >= CURRENT_TIMESTAMP AND onSaleProduct.end_date <= CURRENT_TIMESTAMP AND onSaleProduct.deleted_at IS NULL")
    public List<OnSaleProduct> findByIdAndEndDateNotNullAndAvailableDateAfterNowAndEndDateBeforeNow(Long id);
}
