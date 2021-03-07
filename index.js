const fs = require("fs");

// const data = JSON.parse(fs.readFileSync("./catalog.json"));

// fs.writeFileSync("result.json", JSON.stringify(data.slice(0, 4)));

const express = require("express");
const { random } = require("lodash");
const bodyParser = require("body-parser");
const { v4 } = require("uuid");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// обработка запроса по адресу http://localhost:3000/
app.get("/goods-list", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./catalog.json"));
    // const user = data[random(0, 9)];
    res.json(data);
});

app.post("/goods-list", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./catalog.json"));
    let index = data.findIndex(item => item.id == req.body.id);
    if (index === -1) {
        data.push({ id: req.body.id, productName: req.body.productName, price: req.body.price });
        fs.writeFileSync("catalog.json", JSON.stringify(data));
    }

    res.json({
        success: true,
    });
});

app.post("/basket-list", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./cart.json"));
    let index = data.findIndex(item => item.id == req.body.id);
    if (index !== -1) {
        data.splice(index, 1);
        fs.writeFileSync("cart.json", JSON.stringify(data));
    } else {
        data.push({ id: req.body.id, productName: req.body.productName, price: req.body.price });
        fs.writeFileSync("cart.json", JSON.stringify(data));
    }
    res.json({
        success: true,
    });
});

app.get("/basket-list", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./cart.json"));
    // const user = data[random(0, 9)];
    res.json(data);
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});