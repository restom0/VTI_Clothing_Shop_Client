package vn.vti.clothing_shop.repositories;

import org.springframework.beans.PropertyValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.vti.clothing_shop.entities.Brand;
import vn.vti.clothing_shop.entities.Color;

import java.util.List;
import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<Color,Long> {
    @Query("SELECT c FROM Color c WHERE c.name=:name AND c.deleted_at IS NULL")
    Optional<Color> findByName(String name);

    @Query("SELECT c FROM Color c WHERE c.color=:color AND c.deleted_at IS NULL")
    Optional<Color> findByColor(String color);

    @Query("SELECT c FROM Color c WHERE c.category_id=:id AND c.deleted_at IS NULL")
    Optional<Color> findByCategory_id(Long id);
}
