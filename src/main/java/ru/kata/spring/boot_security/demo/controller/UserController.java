package ru.kata.spring.boot_security.demo.controller;

import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.entity.Role;
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

    @GetMapping("/user/{id}")
    public String showUserById(@PathVariable("id") int id, ModelMap model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        if (user.getRoles()
                .stream()
                .map(Role::getName)
                .anyMatch(name -> name.equals("ROLE_ADMIN"))) {
            model.addAttribute("role", "ADMIN");
        } else {
            model.addAttribute("role", "USER");
        }
        return "user";
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
        model.addAttribute("role", "");
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
    public String create(@ModelAttribute("user") User user,
                         @ModelAttribute("role") String role) {
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

    @GetMapping("/user/{id}/edit")
    public String edit(Model model, @PathVariable("id") long id) {
        model.addAttribute("user", userService.findById(id));
        model.addAttribute("role", "");
        return "/edit";
    }

    @PatchMapping("user/{id}")
    public String update(User updatedUser,
                         @ModelAttribute("role") String role,
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
