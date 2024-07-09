package vn.vti.clothing_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.vti.clothing_shop.entities.Voucher;

public interface VoucherRepository extends JpaRepository<Voucher,Long> {

}
