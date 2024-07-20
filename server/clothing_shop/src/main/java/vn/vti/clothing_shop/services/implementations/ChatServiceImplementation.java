package vn.vti.clothing_shop.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.vti.clothing_shop.dto.in.ChatCreateDTO;
import vn.vti.clothing_shop.dto.in.ChatReplyDTO;
import vn.vti.clothing_shop.dto.in.ChatUpdateDTO;
import vn.vti.clothing_shop.dto.out.ChatDTO;
import vn.vti.clothing_shop.entities.Chat;
import vn.vti.clothing_shop.entities.User;
import vn.vti.clothing_shop.exceptions.NotFoundException;
import vn.vti.clothing_shop.mappers.ChatMapper;
import vn.vti.clothing_shop.repositories.ChatRepository;
import vn.vti.clothing_shop.repositories.UserRepository;
import vn.vti.clothing_shop.requests.ChatCreateRequest;
import vn.vti.clothing_shop.requests.ChatUpdateRequest;
import vn.vti.clothing_shop.services.interfaces.ChatService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatServiceImplementation implements ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;

    @Autowired
    public ChatServiceImplementation(ChatRepository chatRepository, UserRepository userRepository, ChatMapper chatMapper) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.chatMapper = chatMapper;
    }

    public List<ChatDTO> getAllChat(){
        return this.chatRepository.findAll().stream().map(chatMapper::EntityToDTO).collect(Collectors.toList());
    };

    public List<ChatDTO> getChat(Long sender_id){
        return chatRepository.findBySenderId(sender_id).stream().map(chatMapper::EntityToDTO).collect(Collectors.toList());
    };

    public Boolean addChat(Long user_id, ChatCreateDTO chatCreateDTO){
        User user = userRepository.findById(user_id).orElseThrow(()-> new NotFoundException("User not found"));
        chatRepository.save(chatMapper.ChatCreateDTOToChat(chatCreateDTO, user));
        return true;
    }
    public Boolean updateChat(Long chat_id, ChatUpdateDTO chatUpdateDTO){
        Chat chat = chatRepository.findById(chat_id).orElseThrow(()-> new NotFoundException("Chat not found"));
        chatRepository.save(chatMapper.ChatUpdateDTOToChat(chatUpdateDTO, chat));
        return true;
    };
    public Boolean deleteChat(Long id){
        Chat chat = chatRepository.findById(id).orElseThrow(()->new NotFoundException("Chat not found"));
        chat.setDeleted_at(LocalDateTime.now());
        return true;
    };

    public Boolean replyChat(Long id, ChatReplyDTO chatReplyDTO) {
        Chat chat = chatRepository.findById(id).orElseThrow(()-> new NotFoundException("Chat not found"));
        chatRepository.save(chatMapper.ChatReplyDTOToChat(chatReplyDTO,chat));
        return true;
    }
}


