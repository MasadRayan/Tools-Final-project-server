import app from "./app.js";

app.listen(process.env.PORT, () => {
    console.log(`The server in running on http://localhost:${process.env.PORT}`);
})