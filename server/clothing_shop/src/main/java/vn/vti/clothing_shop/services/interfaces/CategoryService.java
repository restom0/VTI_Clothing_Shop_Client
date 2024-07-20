package vn.vti.clothing_shop.services.interfaces;

import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.CategoryCreateDTO;
import vn.vti.clothing_shop.dto.in.CategoryUpdateDTO;
import vn.vti.clothing_shop.dto.out.CategoryDTO;
import vn.vti.clothing_shop.responses.CategoryResponse;

import java.util.List;

@Component
public interface CategoryService {
    List<CategoryDTO> getAllCategories();
    Boolean addCategory(CategoryCreateDTO categoryCreateDTO);
    Boolean updateCategory(CategoryUpdateDTO categoryUpdateDTO);
    Boolean deleteCategory(Long id);
    CategoryResponse getCategoryById(Long id);
}
