import { PostsSchema } from "../../index"

class Posts {
    add = async (data) => {
        return await PostsSchema.create(data)
    }

    getAll = async (condition = null, page, limit) => {
        return await PostsSchema.findAll({
            raw: true,
            where: condition,
            limit,
            offset: page - 1
        })
    }
}

export default new Posts()