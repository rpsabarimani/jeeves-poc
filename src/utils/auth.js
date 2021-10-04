import UserModel from '../db/model/users';


export const authMiddleware = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ status: false, message: "Missing Authorization header with Bearer token" })
        return;
    }

    const token = authHeader.substring("Bearer ".length);
    try {
        const decoded = await decodeToken(token);
        const user = await UserModel.get({ id: decoded.id });
        if (!user) {
            res.status(404).json({ status: false, message: "Invalid authentication token" })
        }
        res.locals.authData = decoded;
        next();
    } catch (err) {
        res.status(500).json({ status: false, message: "Something went wrong while validating the token!" })
    }
}