// @ts-ignore
import { createVerein, getAllVereine } from '$lib/database.server.js';
// @ts-ignore
import { handler } from '.././build/handler.js';
import express from 'express'
// import cors from 'cors'

const app = express()
const PORT = 3000

//const corsOptions = {
//    origin: 'http://localhost:27017',
//}
// app.use(cors(corsOptions))

// new a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});

app.get('/test', async (req, res) => {
    createVerein()
    const response = await getAllVereine()
    res.json(response)
})

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
