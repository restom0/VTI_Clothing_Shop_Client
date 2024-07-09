package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.Brand;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Long>{
    @Override
    @Query("SELECT b FROM Brand b WHERE b.deleted_at IS NULL")
    @NotNull
    List<Brand> findAll();

}
