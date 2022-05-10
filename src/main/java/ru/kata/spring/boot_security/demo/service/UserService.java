package ru.kata.spring.boot_security.demo.service;

import java.util.List;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.model.UserModel;

public interface UserService {

    List<User> findAll();

    User findById(long id);

    User findByUserName(String userName);

    User save(UserModel userModel);

    void update(long id, User updatedUser);

    void delete(long id);
}
