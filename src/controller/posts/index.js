import { v4 as uuidv4 } from 'uuid';
import PostsModel from '../../db/model/posts';

export const add = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { topicId } = req.params;
        const { id: createdBy } = res.locals.authData

        const mediaPath = req.files && req.files.map((file) => {
            return { name: file.originalname, path: `${req.hostname}/${file.filename}`, type: file.mimetype }
        })

        const response = await PostsModel.add({ id: uuidv4(), content, topicId, title, createdBy, mediaPath })

        if (response) {
            res.status(200).json({ status: true, data: response, message: "Topics created successfully!" })
        }
        else
            res.status(200).json({ status: false, message: "Post failed to create!" })

    } catch (error) {
        //TODO: Need to log this error for reference to check the issue
        res.status(500).json({ status: false, message: "Something went wrong!" })
    }
}

export const getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const response = await PostsModel.getAll(null, page, limit)

        if (response) {
            res.status(200).json({ status: true, data: response, message: "Posts fetched successfully!" })
        }
        else
            res.status(200).json({ status: false, message: "Posts failed to fetch!" })

    } catch (error) {
        console.log(error);
        //TODO: Need to log this error for reference to check the issue
        res.status(500).json({ status: false, message: "Something went wrong!" })
    }
}
