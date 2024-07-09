package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.vti.clothing_shop.entities.Chat;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.repositories.ChatRepository;
import vn.vti.clothing_shop.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ChatServiceImplementation {
    @Autowired
    private final ChatRepository chatRepository;

    @Autowired
    private final UserRepository userRepository;

    public ChatServiceImplementation(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public List<Chat> getAllChat(){
        return chatRepository.findAll();
    };
    public List<Chat> getChat(Long sender_id){
        return chatRepository.findBySenderId(sender_id);
    };
    public Boolean addChat(Long user_id, String content){
        User user = userRepository.findById(user_id).orElse(null);
        if(user == null) {
            throw new NotFoundException("User not found");
        }
        Chat chat = new Chat();
        chat.setSender_id(user);
        chat.setContent(content);
        chatRepository.save(chat);
        return true;
    }
    public Boolean updateChat(Long chat_id, String content){
        Chat chat = chatRepository.findById(chat_id).orElse(null);
        if(chat == null) {
            throw new NotFoundException("Chat not found");
        }
        chat.setContent(content);
        chatRepository.save(chat);
        return true;
    };
    public Boolean deleteChat(Long id){
        Chat chat = chatRepository.findById(id).orElse(null);
        if(chat == null) {
            throw new NotFoundException("Chat not found");
        }
        chat.setDeleted_at(LocalDateTime.now());
        return true;
    };
}


