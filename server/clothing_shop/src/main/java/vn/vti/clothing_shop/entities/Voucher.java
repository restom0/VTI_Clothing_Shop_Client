package vn.vti.clothing_shop.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`voucher`")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="stock",nullable = false)
    private Integer stock;
    @Column(name="value",nullable = false)
    private Integer value;
}
