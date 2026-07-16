package com.smartplant.controller;

import com.smartplant.model.User;
import com.smartplant.repository.UserRepository;
import com.smartplant.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.get("username"), req.get("password")));
        User user = userRepo.findByUsername(req.get("username")).orElseThrow();
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return ResponseEntity.ok(Map.of(
            "token", token,
            "user", Map.of("id", user.getId(), "username", user.getUsername(), "name", user.getName(), "role", user.getRole(), "email", user.getEmail())
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepo.existsByUsername(user.getUsername()))
            return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
        user.setPassword(encoder.encode(user.getPassword()));
        if (user.getRole() == null) user.setRole("ENGINEER");
        userRepo.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }
}
