import userService from "../service/user-service.js"
import dialogModel from "../models/dialog-model.js";
import userModel from "../models/user-model.js"
import dialogService from "../service/dialog-service.js";
import DialogDTO from "../dtos/dialog-dto.js";

class DialogController {
    async createDialog(req, res){
        try{
        const {id1,id2} = req.body;
        
        if(await dialogService.hasDialogWithUser(id2)) return res.status(200)
        
        const dialog = await dialogModel.create({usersIds: [id1,id2],messages: []})
        
        const user1 = await userModel.findById(id1)
        await userModel.updateOne({_id:id1},{dialogs: [...user1.dialogs, dialog.id]})
        
        const user2 = await userModel.findById(id2)
        await userModel.findByIdAndUpdate({_id:id2},{dialogs: [...user2.dialogs, dialog.id]})
    
        return res.status(200)
        } catch(e) {
            console.log(e)
        }
    }

    async getDialogs(req, res) {
        try {
            const {id} = req.body
            console.log(id)
            const user = await userModel.findOne({_id:id})
            const friendsIds = await dialogService.getUsersIdsByDialogId(user)
            const friends = await userService.getUserDTOsByIds(friendsIds)
            let dialogs = []
            for(let i = 0; i<friends.length; i++){
                dialogs.push(new DialogDTO({dialogId:user.dialogs[i],user:friends[i]}))
            }
            return res.json(dialogs)
        }   catch(e) {
            console.log(e)
        }
    }

    async getMessages(req,res){
        const {dialogId, userId} = req.body
        console.log(dialogId)
        console.log(userId)
        const messages = await dialogService.getMessages(dialogId, userId)
        return res.json(messages)
    }

}

export default new DialogController();