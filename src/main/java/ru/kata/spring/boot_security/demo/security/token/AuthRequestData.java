package ru.kata.spring.boot_security.demo.security.token;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRequestData {
    private String username;
    private String password;
}
