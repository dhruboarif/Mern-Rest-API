const app = require("./Server");

const port = process.env.port;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

