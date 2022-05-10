package ru.kata.spring.boot_security.demo.service;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.exception.NotFoundException;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.model.UserModel;
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
                .orElseThrow(() -> new UsernameNotFoundException("Username" + userName + " not found"));
    }

    @Transactional
    @Override
    public User save(UserModel userModel) {
        User user = new User();

        user.setUserName(userModel.getUserName());
        user.setPassword(userModel.getPassword());
        user.setEmail(userModel.getEmail());
        userModel.getRoles().forEach(role -> user.getRoles().add(roleService.findByName(role.getName())));

        return userRepo.save(user);
    }

    @Transactional
    @Override
    public void update(long id, User updatedUser) {
        User user = findById(id);
        user.setUserName(updatedUser.getUserName());
        user.setEmail(updatedUser.getEmail());

        user.getRoles().clear();

        updatedUser.getRoles().forEach(role -> user.getRoles().add(roleService.findByName(role.getName())));

        userRepo.save(user);
    }

    @Transactional
    @Override
    public void delete(long id) {
        userRepo.delete(findById(id));
    }
}
