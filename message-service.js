import express from "express"
import expressWS from "express-ws"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dialogService from './service/dialog-service.js'

dotenv.config()

const app = express()

const WSserver = expressWS(app)

const PORT = 4000

app.ws('/', (ws, req) => {
    console.log("Connected");
    ws.on("message", async (msg) => { 
            const messageDTO = JSON.parse(msg);
            await dialogService.addMessage(messageDTO);
            const messages = await dialogService.getMessages(messageDTO.dialogId,messageDTO.userId)
            ws.send(JSON.stringify(messages))
        })
})

await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true}
)

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))