package com.example.Consejo_financiero.controller;


import com.example.Consejo_financiero.entity.Users;
import com.example.Consejo_financiero.entity.UsersStatus;
import com.example.Consejo_financiero.services.UsersService;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;


    @PostMapping("/register")
    public ResponseEntity<Users> registerUser(@RequestBody Users users) {
        Users newUser = usersService.registerUser(users);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @GetMapping("/search/name/{name}")
    public ResponseEntity<?> searchByName(@PathVariable String name){
        Optional<Users> users = usersService.searchByNameUser(name);
        return users.isPresent() ? ResponseEntity.ok(users.get()) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuer not found");
    }

    @GetMapping("/search/id/{userId}")
    public ResponseEntity<?> searchById(@PathVariable Long userId){
        Optional<Users> users = usersService.searchById(userId);
        return users.isPresent() ? ResponseEntity.ok(users.get()) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUserInformation(@PathVariable Long userId,@RequestBody Users users){
        try{
            Users updateUserInformation = new Users();
            updateUserInformation.setName(users.getName());
            updateUserInformation.setSurname(users.getSurname());
            updateUserInformation.setEmail(users.getEmail());
            updateUserInformation.setPassword(users.getPassword());
            updateUserInformation.setAge(users.getAge());
            updateUserInformation.setPhone(users.getPhone());

            Users usersBBDD = usersService.updateUserInformation(userId,updateUserInformation);
            return ResponseEntity.ok(updateUserInformation);
        }catch (Exception exception){
           return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @PutMapping("/status/{userId}")
    public  ResponseEntity<?> changeUserStatus(@PathVariable Long userId, @RequestBody UsersStatus usersStatus){
        try{
            Users usersStatusUpdate = usersService.changeUserStatus(userId,usersStatus);
            return ResponseEntity.ok(usersStatusUpdate);
        }catch (Exception exception){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @GetMapping("/status/{usersStatus}")
    public ResponseEntity<List<Users>> productListByStatus(@PathVariable UsersStatus usersStatus){
        List<Users> users = usersService.getByStatus(usersStatus);
        return ResponseEntity.ok(users);
    }
}
