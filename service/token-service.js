import jwt from "jsonwebtoken";
import tokenModel from '../models/token-model.js';

class TokenService {
    async generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {expiresIn: '60m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
         const token = await tokenModel.create({user:userId, refreshToken:refreshToken})   
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService();