
import jwt from 'jsonwebtoken'

const generateAccessToken = (id) => {
    const token = jwt.sign({id} , process.env.JWT_SECRET)

    return token
}

export default generateAccessToken