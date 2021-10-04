import { CommentSchema } from "../../index"

class Comments {
    add = async (data) => {
        return await CommentSchema.create(data)
    }
}

export default new Comments()