import bcrypt from 'bcrypt';
import UserModal from '../models/userModal.js'
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "all Fields are Required" })
        }

        const isExist = await UserModal.findOne({ email: email.toLowerCase() })
        if (isExist) {
            return res.status(409).send({ status: 'error', message: email + " is Already Exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModal({ name, email, password: hashPassword })
        const createdUser = await newUser.save()

        res.status(201).json({ user: createdUser })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 'error', message: "Some Thing wrong on Server" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "all Fields are Required" })
        }

        const isExist = await UserModal.findOne({ email: email.toLowerCase() }).lean()
        if (!isExist) {
            return res.status(409).send({ status: 'error', message: email + " is not Register" })
        }

        const passwordCheck = await bcrypt.compare(password, isExist.password)
        if (!passwordCheck) {
            return res.status(404).send({ status: 'error', message: "Check Your credentials, Password is Wrong" })
        }
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })
        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        res.cookie(`REFRESH_TOKEN`, refreshToken, {
            // sameSite: 'None',
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure: false,
        })
        res.cookie(`ACCESS_TOKEN`, accessToken, {
            // sameSite: 'None',
            maxAge: 1 * 24 * 60 * 1000,
            httpOnly: true,
            // secure: false,
        })
        delete isExist.password
        res.json({ status: "ok", user: { ...isExist } })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 'error', message: "Some Thing wrong on Server" })
    }
}

const refresh = async (req, res) => {
    try {
        const { REFRESH_TOKEN } = req.cookies

        jwt.verify(REFRESH_TOKEN, process.env.REFRESH_TOKEN, async (err, data) => {
            if (err) return res.status(403).send({ message: "Forbidden" })
            const user = await UserModal.findOne({ email: data.email }).lean().exec()
            if (!user) {
                return res.status(409).send({ status: 'error', message: "user is not Register" })
            }
            delete user.password
            const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
            res.cookie(`ACCESS_TOKEN`, accessToken, {
                // sameSite: 'None',
                maxAge: 1 * 24 * 60 * 1000,
                httpOnly: true,
                // secure: false,
            })
            res.status(200).json({ user })
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Some Thing wrong on Server" })
    }
}

export { register, login, refresh }