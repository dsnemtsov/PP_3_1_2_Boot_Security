package ru.kata.spring.boot_security.demo;

import java.util.List;
import java.util.Set;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@SpringBootApplication
public class SpringBootSecurityDemoApplication implements CommandLineRunner {
	private final UserService userService;
	private final RoleService roleService;

	public SpringBootSecurityDemoApplication(UserService userService, RoleService roleService) {
		this.userService = userService;
		this.roleService = roleService;
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	public void run(String... args) throws Exception {
		Role adminRole = new Role("ROLE_ADMIN");
		Role userRole = new Role("ROLE_USER");

		roleService.save(adminRole);
		roleService.save(userRole);

		User admin = new User();
		admin.setUserName("admin");
		admin.setEmail("admin@mail.ru");
		admin.setPassword(passwordEncoder().encode("password"));
		admin.setRoles(Set.of(adminRole, userRole));

		User user = new User();
		user.setUserName("user");
		user.setEmail("user@mail.ru");
		user.setPassword(passwordEncoder().encode("password"));
		user.setRoles(Set.of(userRole));

		userService.save(user);
		userService.save(admin);
	}
}


