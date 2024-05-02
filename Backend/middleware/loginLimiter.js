import rateLimit from "express-rate-limit";

// Rate limiting configuration
 const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again after 5 minutes"
});

export default loginLimiter