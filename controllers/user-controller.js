import { ConnectionClosedEvent } from "mongodb";
import userService from "../service/user-service.js";

class UserController{
    async registration(req, res, next){
        try {
            const { name, email, password } = req.body;
            const userData = await userService.registration(name, email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json( userData);
        }   catch (e) {
            console.log(e);
        } 
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.authorization(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json( userData);
        }catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.body;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next){
        try {
            const {name,id} = req.body;
            const users = await userService.getUsers(name,id);
            return res.json(users);
        }catch (e) {
            console.log(e);
        }
    }
}

export default new UserController();