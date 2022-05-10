class DialogDTO {
    dialogId;
    user;

    constructor(model) {
        this.dialogId = model.dialogId;
        this.user = model.user;
    }
}

export default DialogDTO;