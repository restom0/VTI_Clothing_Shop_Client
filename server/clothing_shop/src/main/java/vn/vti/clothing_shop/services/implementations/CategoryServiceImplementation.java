package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.entities.Category;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.CategoryRepository;
import vn.vti.clothing_shop.services.interfaces.CategoryService;

import java.util.List;

@Component
public class CategoryServiceImplementation implements CategoryService {
    @Autowired
    private final CategoryRepository categoryRepository;

    public CategoryServiceImplementation(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    public Boolean addCategory(String name) {
        Category category = new Category();
        category.setName(name);
        this.categoryRepository.save(category);
        return true;
    }
    public Boolean updateCategory(String name, Long id){
        Category category = this.categoryRepository.findById(id).orElse(null);
        if (category == null) {
            throw new NotFoundException("Category not found");
        }
        category.setName(name);
        this.categoryRepository.save(category);
        return true;
    };
    public Boolean deleteCategory(Long id){
        Category category = this.categoryRepository.findById(id).orElse(null);
        if (category == null) {
            return false;
        }
        this.categoryRepository.delete(category);
        return true;

    };
}
