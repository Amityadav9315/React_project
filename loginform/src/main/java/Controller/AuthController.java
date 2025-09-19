package Controller;

import Entity.User;
import Repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    // Signup
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        Optional<User> existing = repo.findByUsername(user.getUsername());
        if (existing.isPresent()) {
            return "User already exists!";
        }
        repo.save(user);
        return "Signup successful!";
    }

    // Login
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> dbUser = repo.findByUsername(user.getUsername());
        if (dbUser.isPresent() && dbUser.get().getPassword().equals(user.getPassword())) {
            return "Login successful!";
        }
        return "Invalid username or password!";
    }
}
