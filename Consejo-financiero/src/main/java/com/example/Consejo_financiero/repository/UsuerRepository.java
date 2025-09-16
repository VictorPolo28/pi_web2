package com.example.Consejo_financiero.repository;


import com.example.Consejo_financiero.entity.Users;
import com.example.Consejo_financiero.entity.UsersStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuerRepository extends JpaRepository<Users, Long> {

    Optional<Users> findById(Long idUser);
    Optional<Users> findByName(String UserName);
    Optional<Users> findByEmail(String UserEmail);
    Optional<Users> findByPhone(String phone);
    List<Users> findByUserStatus(UsersStatus userStatus);
}
