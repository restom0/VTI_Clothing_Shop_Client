package vn.vti.clothing_shop.services.interfaces;

import vn.vti.clothing_shop.entities.Chat;

import java.util.List;

public interface ChatService {
    List<Chat> getAllChat();
    List<Chat> getChatByUserId(Long sender_id);
    Boolean addChat(Long user_id, String content);
    Boolean updateChat(Long chat_id, String content);
    Boolean deleteChat(Long id);
}
