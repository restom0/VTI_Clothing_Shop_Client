package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.dto.in.VoucherCreateDTO;
import vn.vti.clothing_shop.dto.in.VoucherUpdateDTO;
import vn.vti.clothing_shop.dto.out.VoucherDTO;
import vn.vti.clothing_shop.requests.VoucherCreateRequest;

import java.util.List;

public interface VoucherService {
    List<VoucherDTO> getAllVouchers();
    List<VoucherDTO> getAllAvailableVouchers();
    VoucherDTO getVoucherById(Long id);
    VoucherDTO getVoucherByCode(String code);
    Boolean createVoucher(VoucherCreateDTO voucherCreateDTO);
    Boolean updateVoucher(VoucherUpdateDTO voucherUpdateDTO);
    Boolean deleteVoucher(Long id);
}
