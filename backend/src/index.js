import express from 'express'
import router from "./router.js";

const PORT = 8080;

const app = express();

app.use(router)

// app.use("/api", router);
// app.use(router)
app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
