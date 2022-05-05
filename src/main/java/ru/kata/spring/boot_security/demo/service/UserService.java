package ru.kata.spring.boot_security.demo.service;

import java.util.List;
import ru.kata.spring.boot_security.demo.entity.User;

public interface UserService {

    List<User> findAll();

    User findById(long id);

    User findByUserName(String userName);

    void save(User user);

    void update(long id, User updatedUser);

    void delete(long id);
}
