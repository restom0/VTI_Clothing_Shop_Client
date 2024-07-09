package vn.vti.clothing_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.Color;

import java.util.Optional;

public interface ColorRepository extends JpaRepository<Color,Long> {
    @Query("SELECT c FROM Color c WHERE c.name=:name AND c.deleted_at IS NULL")
    Optional<Color> findByName(String name);

    @Query("SELECT c FROM Color c WHERE c.color=:color AND c.deleted_at IS NULL")
    Optional<Color> findByColor(String color);
}
