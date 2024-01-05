import { handler } from './build/handler.js';
import express from 'express'

const app = express()
const PORT = 3000

// new a routes that live separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
})

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
