package ru.kata.spring.boot_security.demo.controller;

import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@AllArgsConstructor
@Controller
@RequestMapping()
public class UserController {
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping()
    public String index() {
        return "index";
    }

    @GetMapping("/new")
    public String newUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("role", "");
        return "new";
    }

    @GetMapping("/admin")
    public String adminPage(Model model) {
        model.addAttribute("users", userService.findAll());
        return "admin";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/user")
    public String userPage() {
        return "userHome";
    }

    @PostMapping("/user")
    public String create(User user,
                         String role) {
        if (role.equals("ADMIN")) {
            user.setRoles(Set.of(roleService.findByName("ROLE_ADMIN"),
                    roleService.findByName("ROLE_USER")));
        } else {
            user.setRoles(Set.of(roleService.findByName("ROLE_USER")));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);

        return "redirect:/admin";
    }

    @PatchMapping("user/{id}")
    public String update(User updatedUser,
                         String role,
                         @PathVariable("id") long id) {
        if (role.equals("ADMIN")) {
            updatedUser.setRoles(Set.of(roleService.findByName("ROLE_ADMIN"),
                    roleService.findByName("ROLE_USER")));
        } else {
            updatedUser.setRoles(Set.of(roleService.findByName("ROLE_USER")));
        }
        userService.update(id, updatedUser);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
