import { UsersSchema } from ".."

class Users {
    add = async (userData) => {
        return await UsersSchema.create(userData)
    }

    get = async (condition) => {
        return await UsersSchema.findOne({ raw: true, where: condition })
    }
}

export default new Users()