package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import ru.kata.spring.boot_security.demo.security.filter.JwtTokenConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtTokenConfigurer jwtTokenConfigurer;
    private final String restClientOrigin;
    private final String authTokenName;

    public WebSecurityConfig(JwtTokenConfigurer jwtTokenConfigurer,
                             @Value("${rest.client.origin}") String restClientOrigin,
                             @Value("${jwt.header}") String authTokenName) {
        this.jwtTokenConfigurer = jwtTokenConfigurer;
        this.restClientOrigin = restClientOrigin;
        this.authTokenName = authTokenName;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().configurationSource(getCorsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/sec/auth/login", "/").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(jwtTokenConfigurer)

        ;

    }

    private CorsConfigurationSource getCorsConfigurationSource() {
        return request -> {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.addAllowedHeader(authTokenName);
            configuration.addAllowedHeader("Content-Type");
            configuration.addAllowedHeader("Content");

            configuration.addAllowedMethod("*");

            configuration.addAllowedOrigin(restClientOrigin);

            configuration.addExposedHeader(authTokenName);
            return configuration;
        };
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}