import { v4 as uuidv4 } from 'uuid';
import CommentsModel from '../../db/model/posts/comments';

export const add = async (req, res) => {
    try {
        const { comment } = req.body;
        const { id: createdBy } = res.locals.authData
        const { postId } = req.params;

        const response = await CommentsModel.add({ id: uuidv4(), comment, createdBy, postId })

        if (response) {
            res.status(200).json({ status: true, data: response, message: "COmment added successfully!" })
        }
        else
            res.status(200).json({ status: false, message: "COmment failed to add!" })

    } catch (error) {
        console.log(error);
        //TODO: Need to log this error for reference to check the issue
        res.status(500).json({ status: false, message: "Something went wrong!" })
    }
}
