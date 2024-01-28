import express from "express";
import { register, login, refresh } from '../controller/authController.js'

const router = express.Router()

router.post('/login', login)

router.post('/register', register)

router.get('/refresh', refresh)

export default router