package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.entities.Category;

import java.util.List;

@Component
public interface CategoryService {
    List<Category> getAllCategories();
    Boolean addCategory(String name);
    Boolean updateCategory(String name, Long id);
    Boolean deleteCategory(Long id);
}
