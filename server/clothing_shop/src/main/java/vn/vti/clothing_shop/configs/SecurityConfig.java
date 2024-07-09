package vn.vti.clothing_shop.configs;

import jakarta.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import vn.vti.clothing_shop.middlewares.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.POST,"/product/**").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/product/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/product/**").authenticated()

                        .requestMatchers(HttpMethod.POST,"/brand/**").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/brand/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/brand/**").authenticated()

                        .requestMatchers(HttpMethod.POST,"/category/**").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/category/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/category/**").authenticated()

                        .requestMatchers(HttpMethod.GET, "/chat/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/chat/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/chat/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/chat/**").authenticated()

                        .requestMatchers(HttpMethod.GET, "/order/**").authenticated()
                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();

    }
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        return http
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(
//                        req->req.requestMatchers("/auth/**", "/swagger-ui/**", "/v3/api-docs/**")
//                                .permitAll()
//                                .anyRequest()
//                                .authenticated()
//                )
//                .sessionManagement(session->session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .build();
//
//    }
}