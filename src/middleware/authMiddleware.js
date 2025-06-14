import jwt from 'jsonwebtoken';
import User from '../models/User.js';  
import dotenv from 'dotenv';


dotenv.config();

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  

    if (!token) {
        return res.status(403).json({ message: 'Acesso negado! Token não fornecido.' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  
        req.user = decoded; 

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado. Token inválido.' });
        }

        next(); 

    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

export default authenticate;