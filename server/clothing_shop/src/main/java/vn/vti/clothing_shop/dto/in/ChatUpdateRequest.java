package vn.vti.clothing_shop.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatUpdateRequest {
    @NotNull(message = "Vui lòng nhập tin nhắn")
    @NotBlank(message = "Vui lòng nhập tin nhắn")
    private String content;
}
