package ru.kata.spring.boot_security.demo.model;

import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.kata.spring.boot_security.demo.entity.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {
    @NotBlank
    private String userName;

    @NotBlank
    private String password;

    @NotBlank
    private String email;

    private Set<Role> roles = new HashSet<>();
}
