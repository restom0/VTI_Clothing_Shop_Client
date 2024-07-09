package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.dto.in.ProductCreateRequest;
import vn.vti.clothing_shop.dto.in.ProductUpdateRequest;
import vn.vti.clothing_shop.entities.Brand;
import vn.vti.clothing_shop.entities.Category;
import vn.vti.clothing_shop.entities.Product;
import vn.vti.clothing_shop.exceptions.InternalServerErrorException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.BrandRepository;
import vn.vti.clothing_shop.repositories.CategoryRepository;
import vn.vti.clothing_shop.repositories.ProductRepository;
import vn.vti.clothing_shop.services.interfaces.ProductService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class ProductServiceImplementation implements ProductService {
    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final BrandRepository brandRepository;

    @Autowired
    private final CategoryRepository categoryRepository;

    public ProductServiceImplementation(ProductRepository productRepository, BrandRepository brandRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts(){
        return this.productRepository.findAll();
    };
    public Boolean addProduct(ProductCreateRequest productCreateRequest){
        Brand brand =this.brandRepository.findById(productCreateRequest.getBrand_id()).orElse(null);
        if(brand==null){
            throw new NotFoundException("Brand not found");
        }
        Category category = this.categoryRepository.findById(productCreateRequest.getBrand_id()).orElse(null);
        if(category==null){
            throw new NotFoundException("Category not found");
        }
        Product product = new Product();
        product.setName(productCreateRequest.getName());
        product.setShort_description((productCreateRequest.getShort_description()));
        product.setImageUrl(productCreateRequest.getImageUrl());
        product.setBrand_id(brand);
        product.setCategory_id(category);
        this.productRepository.save(product);
        return true;
    };
    public Boolean deleteProduct(Long id){
        try{
            Optional<Product> product = this.productRepository.findById(id);
            if(product.isEmpty()){
                throw new NotFoundException("Product not found");
            }
            Product result = product.get();
            result.setDeleted_at(LocalDateTime.now());
            return true;
        }
        catch (Exception e){
            throw new InternalServerErrorException("Server error");
        }
    };
    public Boolean updateProduct(ProductUpdateRequest productUpdateRequest,Long id){
        try{
            Optional<Product> product = this.productRepository.findById(id);
            if(product.isEmpty()){
                throw new NotFoundException("Product not found");
            }
            Brand brand =this.brandRepository.findById(productUpdateRequest.getBrand_id()).orElse(null);
            if(brand==null){
                throw new NotFoundException("Brand not found");
            }
            Category category = this.categoryRepository.findById(productUpdateRequest.getBrand_id()).orElse(null);
            if(category==null){
                throw new NotFoundException("Category not found");
            }
            Product result = product.get();
            result.setName(productUpdateRequest.getName());
            result.setShort_description((productUpdateRequest.getShort_description()));
            result.setImageUrl(productUpdateRequest.getImageUrl());
            result.setBrand_id(brand);
            result.setCategory_id(category);
            return true;
        }
        catch (Exception e){
            throw new InternalServerErrorException("Server error");
        }
    };
    public Product getProductById(Long id){
        try{
            Optional<Product> product = this.productRepository.findById(id);
            if(product.isEmpty()){
                throw new NotFoundException("Product not found");
            }
            return product.get();
        }
        catch (Exception e){
            throw new InternalServerErrorException("Server error");
        }
    };
}
