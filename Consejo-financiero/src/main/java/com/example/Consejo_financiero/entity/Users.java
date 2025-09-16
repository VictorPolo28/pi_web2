package com.example.Consejo_financiero.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue
    @Column(name = "id_user")
    private Long userId;

    @Column(name ="name", nullable = false,length = 100)
    private String name;

    @Column(name="surname")
    private String surname;

    @Column(name="email",nullable = false,unique = true)
    private String email;

    @Column(name="phone")
    private String phone;

    @Column(name="password",nullable = false)
    private String password;

    @Column(name="age", nullable = false)
    private int age;

    @Column(name="singDate", updatable = false)
    @CreationTimestamp
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private UsersStatus userStatus;
}
