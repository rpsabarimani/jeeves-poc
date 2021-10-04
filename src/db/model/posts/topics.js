import { TopicsSchema } from "../../index"

class Topics {
    add = async (data) => {
        return await TopicsSchema.create(data)
    }

    get = async (condition) => {
        return await TopicsSchema.findOne({ raw: true, where: condition })
    }
}

export default new Topics()