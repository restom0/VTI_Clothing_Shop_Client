package vn.vti.clothing_shop.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import vn.vti.clothing_shop.constants.ClothGender;

import java.time.LocalDateTime;

import static vn.vti.clothing_shop.constants.RegularExpression.NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`imported_product`")
public class ImportedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product_id;

    @ManyToOne
    @JoinColumn(name = "size_id",referencedColumnName = "id")
    private Size size_id;

    @ManyToOne
    @JoinColumn(name = "color_id",referencedColumnName = "id")
    private Color color_id;

    @ManyToOne
    @JoinColumn(name = "type_id",referencedColumnName = "id")
    private Type type_id;

    @ManyToOne
    @JoinColumn(name = "material_id",referencedColumnName = "id")
    private Material material_id;

    @Column(name = "sku")
    private String sku;

    @Column(name = "gender")
    private ClothGender gender;

    @NotNull(message = "Import price is required")
    @Pattern(regexp = NUMBER, message = "Import price must be a number")
    @Column(name = "importPrice",nullable = false)
    private Integer importPrice;

    @NotNull(message = "Stock is required")
    @Pattern(regexp = NUMBER, message = "Stock must be a number")
    @Column(name = "stock",nullable = false)
    private Integer stock;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime created_at;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @Column(name = "deleted_at")
    private LocalDateTime deleted_at;
}
//Table import_product_price_list{
//id integer [pk]
//product_id integer [ref: < products.id]
//size_id integer [ref: < sizes.id]
//color_id integer [ref: < colors.id]
//type_id integer [ref:< types.id]
//material_id integer [ref: < material.id]
//sku string
//gender gender
//importPrice integer
//stock integer
//created_at timestamp
//updated_at timestamp
//deleted_at timestamp
//}