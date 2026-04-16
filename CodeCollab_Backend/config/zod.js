import {z} from "zod"

export const registerSchema=z.object({
    name:z.string().min(2,"Name must be at least three character long"),
    email:z.email("Invalid email format"),
    password:z.string().min(3,"Password must be at least 4 characters ")
})

export const loginSchema=z.object({
    email:z.email("Invalid email format"),
    password:z.string().min(3,"Password must be at least 4 characters ")
})