package Controller;

import Repository.UserRepository;

import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    // Signup
    @PostMapping("/signup")
    public String signup(@RequestBody Entity.User user) {
        Optional<Entity.User> existing = repo.findByUsername(user.getUsername());
        if (existing.isPresent()) {
            return "User already exists!";
        }
        repo.save(user);
        return "Signup successful!";
    }

    // Login
    @PostMapping("/login")
    public String login(@RequestBody Entity.User user) {
        Optional<Entity.User> dbUser = repo.findByUsername(user.getUsername());
        if (dbUser.isPresent() && dbUser.get().getPassword().equals(user.getPassword())) {
            return "Login successful!";
        }
        return "Invalid username or password!";
    }
}
