import { TopicsSchema } from "../../index"

class Topics {
    add = async (data) => {
        return await TopicsSchema.create(data)
    }

    getAll = async (condition = null, page, limit) => {
        return await TopicsSchema.findAll({
            raw: true,
            where: condition,
            limit,
            offset: page - 1
        })
    }
}

export default new Topics()