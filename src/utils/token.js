import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(id) {
    return new Promise((resolve, reject) => {
        jwt.sign({ id }, JWT_SECRET, { expiresIn: "30 days" }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
}

export function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(decoded);
        });
    });
}
