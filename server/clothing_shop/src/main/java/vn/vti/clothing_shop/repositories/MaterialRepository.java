package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.Material;

import java.util.List;
import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material,Long> {
    @Override
    @Query("SELECT m FROM Material m WHERE m.deleted_at IS NULL")
    @NotNull
    List<Material> findAll();

    Optional<Material> findByName(String name);
}

