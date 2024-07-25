package vn.vti.clothing_shop.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatCreateRequest {
    @NotBlank(message = "Vui lòng nhập tin nhắn")
    private String content;
}