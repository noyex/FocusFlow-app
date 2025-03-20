package com.noyex.auth.service;

import com.noyex.auth.exceptions.*;
import com.noyex.data.model.DTOs.LoginUserDto;
import com.noyex.data.model.DTOs.RegisterUserDto;
import com.noyex.data.model.DTOs.VerifyUserDto;
import com.noyex.data.model.User;
import com.noyex.data.model.UserFocusDetails;
import com.noyex.data.repository.UserFocusDetailsRepository;
import com.noyex.data.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final UserFocusDetailsRepository userFocusDetailsRepository;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            EmailService emailService, UserFocusDetailsRepository userFocusDetailsRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.userFocusDetailsRepository = userFocusDetailsRepository;
    }

    public User signup(RegisterUserDto input) {
        Optional<User> existingUser = userRepository.findByEmail(input.getEmail());
        if (existingUser.isPresent()) {
            throw new EmailAlreadyInUseException("Email already in use");
        }
        if (userRepository.existsByUsername(input.getUsername())) {
            throw new UsernameAlreadyInUseException("Username already in use");
        }

        User user = new User(input.getUsername(), passwordEncoder.encode(input.getPassword()), input.getEmail());
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!user.isEnabled()) {
            throw new AccountNotVerifiedException("Account not verified. Please verify your account.");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        input.getPassword()
                )
        );

        return user;
    }

    public void verifyUser(VerifyUserDto input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new VerificationCodeExpiredException("Verification code has expired");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                UserFocusDetails userFocusDetails = new UserFocusDetails();
                userFocusDetails.setUser(user);
                userFocusDetailsRepository.save(userFocusDetails);
                userRepository.save(user);
            } else {
                throw new InvalidVerificationCodeException("Invalid verification code");
            }
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

    private void sendVerificationEmail(User user) {
        String subject = "Focus Flow - Account Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;\">"
                + "<div style=\"background: linear-gradient(135deg, #121212 0%, #1e1e2e 100%); padding: 30px; color: #FFFFFF; border-radius: 24px;\">"
                + "<h2 style=\"color: #FFFFFF; font-weight: 700; font-size: 28px;\">Welcome to Focus Flow!</h2>"
                + "<p style=\"font-size: 16px; color: rgba(255, 255, 255, 0.8);\">Please enter the verification code below to activate your account:</p>"
                + "<div style=\"background-color: rgba(30, 30, 46, 0.8); padding: 25px; border-radius: 16px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1);\">"
                + "<h3 style=\"color: #FFFFFF; font-size: 18px; margin-bottom: 15px;\">Verification Code:</h3>"
                + "<p style=\"font-size: 24px; font-weight: bold; background: linear-gradient(to right, #9370DB, #B19CD9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; padding: 10px 0;\">" + verificationCode + "</p>"
                + "</div>"
                + "<p style=\"font-size: 14px; color: rgba(255, 255, 255, 0.7); margin-top: 25px;\">This code will expire in 30 minutes. If you didn't request this verification, please ignore this email.</p>"
                + "<div style=\"margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);\">"
                + "<p style=\"font-size: 14px; color: rgba(255, 255, 255, 0.6);\">© " + java.time.Year.now().getValue() + " Focus Flow. All rights reserved.</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            System.out.println("Verification email sent to " + user.getEmail());
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
