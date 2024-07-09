package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.ImportedProduct;

import java.util.List;
import java.util.Optional;

public interface ImportedProductRepository extends JpaRepository<ImportedProduct,Long> {
    @Override
    @Query("SELECT ip FROM ImportedProduct ip WHERE ip.deleted_at IS NULL")
    @NotNull
    List<ImportedProduct> findAll();

    @Query("SELECT ip FROM ImportedProduct ip WHERE ip.product_id.category_id = ?1")
    Optional<ImportedProduct> findByCategoryId(Long id);

    @Query("SELECT ip FROM ImportedProduct ip WHERE ip.product_id.id = ?1")
    Optional<ImportedProduct> findByProductId(Long id);

    @Query("SELECT ip FROM ImportedProduct ip WHERE ip.product_id.brand_id = ?1")
    Optional<ImportedProduct> findByBrandId(Long id);
}
