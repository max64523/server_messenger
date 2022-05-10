import dialogModel from "../models/dialog-model.js"
import userModel from "../models/user-model.js"

class DialogService {

    async getUsersIdsByDialogId(user){
        let usersIds = []
            for(let dialogId of user.dialogs){
                const dialog = await dialogModel.findById(dialogId)
                for(let dialogUserId of dialog.usersIds){
                    if(dialogUserId != user.id) usersIds.push(dialogUserId)
                }
            }
            return usersIds;
    }


    async hasDialogWithUser(id){
        const user = await userModel.findOne({id: id})
        let dialogs = []
        for(let id of user.dialogs){
            const dialog = await dialogModel.findById(id)
            dialogs.push(dialog)
        }
        for(let dialog of dialogs)
            for(let userId of dialog.usersIds)
                if(userId === id) return true
        return false
    }

    async addMessage(messageDTO){
        const {dialogId, userId, message} = messageDTO

        const dialog = await dialogModel.findById(dialogId)
        await dialogModel.updateOne({_id:dialogId},
            {messages: [...dialog.messages, 
                {   
                    userId: userId, 
                    message: message
                }]
            })
    }

    async getMessages(dialogId,userId){
        const dialog = await dialogModel.findById(dialogId)

        if(dialog.usersIds[0] != userId && dialog.usersIds[1] != userId) {return {data: ""}};

        return dialog.messages
    }
}


export default new DialogService()