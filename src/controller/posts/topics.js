import { v4 as uuidv4 } from 'uuid';
import TopicsModel from '../../db/model/posts/topics';

export const add = async (req, res) => {
    try {
        const { title } = req.body;
        const { id: createdBy } = res.locals.authData

        const response = await TopicsModel.add({ id: uuidv4(), title, createdBy })

        if (response) {
            res.status(200).json({ status: true, data: response, message: "Topic created successfully!" })
        }
        else
            res.status(200).json({ status: false, message: "Topic failed to create!" })

    } catch (error) {
        //TODO: Need to log this error for reference to check the issue
        res.status(500).json({ status: false, message: "Something went wrong!" })
    }
}

export const getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const response = await TopicsModel.getAll(null, page, limit)

        if (response) {
            res.status(200).json({ status: true, data: response, message: "Topic fetched successfully!" })
        }
        else
            res.status(200).json({ status: false, message: "Topic failed to fetch!" })

    } catch (error) {
        //TODO: Need to log this error for reference to check the issue
        res.status(500).json({ status: false, message: "Something went wrong!" })
    }
}
