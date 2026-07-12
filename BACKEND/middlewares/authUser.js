import jwt from 'jsonwebtoken'

//user auth middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorised" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};



export default authUser