import { rateLimit } from 'express-rate-limit'

export const overAllLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 100, // limit each IP to 100 requests per windowsMs
})


// use for login page request
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 10, // limit each IP to 10 requests per windowsMs
})


// use for register page request
export const RegisterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 10, // limit each IP to 10 requests per windowsMs
})