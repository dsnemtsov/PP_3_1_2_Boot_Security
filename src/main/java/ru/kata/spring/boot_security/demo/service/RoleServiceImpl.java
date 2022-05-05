package ru.kata.spring.boot_security.demo.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.exception.NotFoundException;
import ru.kata.spring.boot_security.demo.repo.RoleRepo;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService{
    private final RoleRepo roleRepo;

    @Transactional
    @Override
    public void save(Role role) {
        roleRepo.save(role);
    }

    @Transactional
    @Override
    public Role findByName(String roleName) {
        return roleRepo
                .findByName(roleName)
                .orElseThrow(() -> new NotFoundException("Role " + roleName + " not found"));
    }
}
