package com.example.Consejo_financiero.services;

import com.example.Consejo_financiero.entity.Users;
import com.example.Consejo_financiero.entity.UsersStatus;

import java.util.List;
import java.util.Optional;

public interface UsersService {




    Optional<Users> searchById(Long idUser);
    Optional<Users> searchByNameUser(String userName);
    Optional<Users> searchByEmail(String userEmail);
    Optional<Users> searchByPhone(String phone);

    Users updateUserInformation(Long idUser, Users user);
    Users changeUserStatus(Long idUser, UsersStatus newUserStatus);
    Users registerUser(Users user);

    List<Users> getByStatus(UsersStatus usersStatus);
}