package vn.vti.clothing_shop.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

import static vn.vti.clothing_shop.constants.RegularExpression.NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`on_sale_product`")
public class OnSaleProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private ImportedProduct product_id;

    @Column(name = "sale_price",columnDefinition = "FLOAT(10,2)",nullable = false)
    @Pattern(regexp = NUMBER, message = "Sale price must be a number")
    private Float sale_price;

    @Column(name = "discount",columnDefinition = "FLOAT(10,2)")
    @DecimalMin(value = "0.00", message = "Discount must be greater than or equal to 0")
    @DecimalMax(value = "100.00", message = "Discount must be less than or equal to 100")
    private Float discount;

    @ManyToOne
    @JoinColumn(name = "input_sale_id",referencedColumnName = "id")
    private InputSale input_sale_id;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime created_at;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @Column(name = "deleted_at",columnDefinition = "TIMESTAMP")
    private LocalDateTime deleted_at;
}
//Table sale_product_price_list{
//id integer [pk]
//product_id integer [ref: < import_product_price_list.id]
//salePrice integer
//discount float
//availableDate timestamp
//created_at timestamp
//updated_at timestamp
//deleted_at timestamp
//}