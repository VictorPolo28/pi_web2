package com.example.Consejo_financiero.services.impl;

import com.example.Consejo_financiero.entity.Users;
import com.example.Consejo_financiero.entity.UsersStatus;
import com.example.Consejo_financiero.repository.UsuerRepository;
import com.example.Consejo_financiero.services.UsersService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServicesImpl implements UsersService {

    @Autowired
    private UsuerRepository userRepository;

    @Override
    public Users registerUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public List<Users> getByStatus(UsersStatus usersStatus) {
        return userRepository.findByUserStatus(usersStatus);
    }

    @Override
    public Optional<Users> searchById(Long idUser) {
        return userRepository.findById(idUser);
    }

    @Override
    public Optional<Users> searchByNameUser(String userName) {
        return userRepository.findByName(userName);
    }

    @Override
    public Optional<Users> searchByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail);
    }

    @Override
    public Optional<Users> searchByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }


    @Override
    @SneakyThrows
    public Users updateUserInformation(Long idUser, Users user) {
       Users userExist = userRepository.findById(idUser)
               .orElseThrow(()->new Exception("El usuario  con ID: " +idUser+" No fue encontrado"));

       userExist.setName(user.getName());
       userExist.setSurname(user.getSurname());
       userExist.setEmail(user.getEmail());
       userExist.setPhone(user.getPhone());
       userExist.setPassword(user.getPassword());

       return userRepository.save(userExist);
    }

    @Override
    @SneakyThrows
    public Users changeUserStatus(Long idUser, UsersStatus newUserStatus) {
        Users userExist = userRepository.findById(idUser)
                .orElseThrow(()->new Exception("El usuario  con ID: " +idUser+" No fue encontrado"));
        userExist.setUserStatus(newUserStatus);
        return userRepository.save(userExist);
    }

}
