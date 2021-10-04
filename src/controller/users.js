import usersModel from "../db/model/users"
import { generateToken } from "../utils/token";
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;

        //TODO: Have to validate user inputs
        //TODO: Have to hash user password before inserting into DB

        const response = await usersModel.add({ id: uuidv4(), name, email, phone, password })

        if (response) {
            const user = JSON.parse(JSON.stringify(response))
            const token = await generateToken(user.id)
            res.status(200).json({ status: true, data: { token }, message: "User created successfully!" })
        }
        else
            res.status(200).json({ status: false, message: "User failed to create!" })

    } catch (error) {
        //TODO: Need to log this error for reference to check the issue
        res.status(500).json({ status: false, message: "Something went wrong!" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usersModel.get({ email, password })

        if (user) {
            const token = await generateToken(user.id)
            res.status(200).json({ status: true, data: { name: user.name, email: user.email, token }, message: "User logged in successfully!" })
        }
        else
            res.status(200).json({ status: false, message: "Invalid login credential!" })

    } catch (error) {
        console.log(error);
        //TODO: Need to log this error for reference to check the issue
        res.status(500).json({ status: false, message: "Something went wrong!" })
    }
}