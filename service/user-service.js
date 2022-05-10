import UserModel from  "../models/user-model.js";
import bcrypt from 'bcrypt';
import tokenService from "../service/token-service.js";
import UserDto from "../dtos/user-dto.js"
import userModel from "../models/user-model.js";

class UserService {
    async registration (name, email, password) {
        const candidate = await UserModel.findOne({email});
        if(candidate) {
            throw new Error(`Пользователь с таким E-mail ${email} уже существует`);
        }   
        const hashPassword = await bcrypt.hash(password, 2);
        const user = await UserModel.create({name, email, password:hashPassword});
        user.isActivated = true;
        const userDto = new UserDto(user);
        
        const tokens = await tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, await tokens.refreshToken);
    
        return {
            user: userDto,
            ...tokens
        }
    }

    async authorization (email, password){
        const candidate = await UserModel.findOne({email});
        if(!candidate) {
            throw new Error(`Wrong login or password`);
        }
        if(!bcrypt.compare(password, candidate.password)) {
            throw new Error(`Wrong login or password`);
        }
        candidate.isActivated = true;
        const userDto = new UserDto(candidate);
        const tokens = await tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);


        return {
            user:userDto,
            ...tokens
        };
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async getUsers (name,id) {
        const users = await userModel.find({name:new RegExp(name,"ig")})
        for(let user of users)
            if (user.id == id) return [];
        const userDTOs =  users.map(user => { return new UserDto(user)})
        return userDTOs;
    }

    async getUserDTOsByIds(usersIds){
        let users = []
            for(let userId of usersIds){
                let user = new UserDto(await userModel.findById(userId))
                users.push(user)
            }
        return users;
    }
}

export default new UserService();
