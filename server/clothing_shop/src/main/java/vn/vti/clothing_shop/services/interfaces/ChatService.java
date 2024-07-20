package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.dto.in.ChatCreateDTO;
import vn.vti.clothing_shop.dto.in.ChatReplyDTO;
import vn.vti.clothing_shop.dto.in.ChatUpdateDTO;
import vn.vti.clothing_shop.dto.out.ChatDTO;
import vn.vti.clothing_shop.requests.ChatCreateRequest;
import vn.vti.clothing_shop.requests.ChatUpdateRequest;

import java.util.List;

public interface ChatService {
    List<ChatDTO> getAllChat();
    List<ChatDTO> getChat(Long sender_id);
    Boolean addChat(Long user_id, ChatCreateDTO chatCreateDTO);
    Boolean updateChat(Long chat_id, ChatUpdateDTO chatUpdateDTO);
    Boolean deleteChat(Long id);
    Boolean replyChat(Long id, ChatReplyDTO chatReplyDTO);
}
