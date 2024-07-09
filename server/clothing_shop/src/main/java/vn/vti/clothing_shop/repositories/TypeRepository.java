package vn.vti.clothing_shop.repositories;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.vti.clothing_shop.entities.Type;

import java.util.List;
import java.util.Optional;

public interface TypeRepository extends JpaRepository<Type,Long> {
    @Override
    @Query("SELECT t FROM Type t WHERE t.deleted_at IS NULL")
    @NotNull
    List<Type> findAll();

    @Query("SELECT t FROM Type t WHERE t.name = :name AND t.deleted_at IS NULL")
    Optional<Type> findByName(String name);
}

