class messageDTO {
    dialogId;
    userId;
    message

    constructor(model) {
        this.dialogId = model.dialogId;
        this.userId = model.userId;
        this.message = model.message;
    }
}

export default DialogDTO;