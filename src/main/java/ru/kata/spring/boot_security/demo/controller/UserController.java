package ru.kata.spring.boot_security.demo.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.model.UserModel;
import ru.kata.spring.boot_security.demo.service.UserService;

@RestController
@RequestMapping()
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/user")
    public ResponseEntity create(@RequestBody UserModel userModel) {
        userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userModel));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("user/{id}")
    public ResponseEntity update(@PathVariable("id") long id,
                                 @RequestBody User updatedUser) {
        userService.update(id, updatedUser);

        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/user/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }
}
