import { app } from "./app.js";
import { connectBD } from "./config/database.js";
import {} from 'dotenv/config'
const PORT = process.env.PORT || 8080;
connectBD();


app.listen(PORT, () =>
    console.log(`server listen on http://localhost:${PORT}`)
);