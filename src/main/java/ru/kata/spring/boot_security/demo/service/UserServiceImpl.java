package ru.kata.spring.boot_security.demo.service;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.exception.NotFoundException;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repo.UserRepo;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final RoleService roleService;

    @Transactional
    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Transactional
    @Override
    public User findById(long id) {
        return userRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    }

    @Transactional
    @Override
    public User findByUserName(String userName) {
        return userRepo.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("Email" + userName + " not found"));
    }

    @Transactional
    @Override
    public void save(User user) {
        userRepo.save(user);
    }

    @Transactional
    @Override
    public void update(long id, User updatedUser) {
        User user = findById(id);
        user.setUserName(updatedUser.getUserName());
        user.setEmail(updatedUser.getEmail());
        if (updatedUser.getRoles()
                .stream()
                .map(Role::getName)
                .anyMatch(name -> name.equals("ROLE_ADMIN"))) {
            user.getRoles().add(roleService.findByName("ROLE_ADMIN"));
        } else {
            user.getRoles().clear();
            user.getRoles().add(roleService.findByName("ROLE_USER"));
        }

        userRepo.save(user);
    }

    @Transactional
    @Override
    public void delete(long id) {
        userRepo.delete(findById(id));
    }
}