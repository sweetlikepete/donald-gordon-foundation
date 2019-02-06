

import express from "express";


const app = express();
const port = 8080;


app.get("/", (req, res) => {

    const success = 200;

    return res
    .status(success)
    .send("Hello, worldy!")
    .end();

});

const PORT = process.env.PORT || port;

app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`);
    console.log("Press Ctrl+C to quit.");
});
