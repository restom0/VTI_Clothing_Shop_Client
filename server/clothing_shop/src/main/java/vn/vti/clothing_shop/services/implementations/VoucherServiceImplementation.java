package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.dtos.ins.VoucherCreateDTO;
import vn.vti.clothing_shop.dtos.ins.VoucherUpdateDTO;
import vn.vti.clothing_shop.dtos.outs.VoucherDTO;
import vn.vti.clothing_shop.entities.Voucher;
import vn.vti.clothing_shop.exceptions.BadRequestException;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.mappers.VoucherMapper;
import vn.vti.clothing_shop.repositories.VoucherRepository;
import vn.vti.clothing_shop.services.interfaces.VoucherService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VoucherServiceImplementation implements VoucherService {

    private final VoucherRepository voucherRepository;
    private final VoucherMapper voucherMapper;

    @Autowired
    public VoucherServiceImplementation(VoucherRepository voucherRepository, VoucherMapper voucherMapper) {
        this.voucherRepository = voucherRepository;
        this.voucherMapper = voucherMapper;
    }

    public List<VoucherDTO> getAllVouchers(){
        return voucherMapper.EntityToDTO(voucherRepository.findAll());
    };
    public List<VoucherDTO> getAllAvailableVouchers(){
        return voucherMapper.EntityToDTO(voucherRepository.findAllWithPositiveStockAndAvailable());
    };
    public VoucherDTO getVoucherById(Long id){
        return voucherMapper.EntityToDTO(voucherRepository.findById(id).orElseThrow(()->new NotFoundException("Voucher not found")));
    };
    public VoucherDTO getVoucherByCode(String code){
        return voucherMapper.EntityToDTO(voucherRepository.findByCode(code).orElseThrow(()->new NotFoundException("Voucher not found")));
    };
    public Boolean createVoucher(VoucherCreateDTO voucherCreateDTO){
        if(voucherRepository.findByCode(voucherCreateDTO.getCode()).isPresent()){
            throw new BadRequestException("Voucher code already exists");
        }
        voucherRepository.save(voucherMapper.createDTOToEntity(voucherCreateDTO));
        return true;
    };
    public Boolean updateVoucher(VoucherUpdateDTO voucherUpdateDTO){
        Voucher voucher = voucherRepository.findById(voucherUpdateDTO.getId()).orElseThrow(()->new NotFoundException("Voucher not found"));
        voucherRepository.save(voucherMapper.updateDTOToEntity(voucher,voucherUpdateDTO));
        return true;
    };
    public Boolean deleteVoucher(Long id){
        Voucher voucher = voucherRepository.findById(id).orElseThrow(()->new NotFoundException("Voucher not found"));
        voucher.setDeleted_at(LocalDateTime.now());
        voucherRepository.save(voucher);
        return true;
    };

}
