const { createServer } = require("http");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();
const dev = app.get("env") !== "production";

app.use(bodyParser.json());
app.use(cors()); // Cross Origin Resource Sharing

// mongodb connection
mongoose.connect("mongodb+srv://shop_user:1234@cluster0.58ddx.mongodb.net/p-react-shop-db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb is connected");
});

/*
      Product
*/
const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: { type: String, default: shortid.generate },
        image: String,
        title: String,
        description: String,
        availableSizes: [String],
        price: Number,
    })
);

// find
app.get("/api/products", (req, res) => {
    Product.find({}).then((products) => res.json(products));
});

// save
app.post("/api/products", (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save().then(() => res.json("Added"));
});

// delete
app.delete("/api/products/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(() => res.json("Deleted"));
});

/*
        Order
*/
const Order = mongoose.model(
    "order",
    new mongoose.Schema(
        {
            _id: {
                type: String,
                default: shortid.generate,
            },
            email: String,
            name: String,
            address: String,
            total: Number,
            cartItems: [
                {
                    _id: String,
                    title: String,
                    price: Number,
                    size: String,
                    count: Number,
                },
            ],
        },
        {
            timestamps: true,
        }
    )
);

// find()
app.get("/api/orders", (req, res) => {
    Order.find({})
        .sort({ createdAt: -1 })
        .then((orders) => res.json(orders));
});

// save
app.post("/api/orders", (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.address || !req.body.total || !req.body.cartItems) {
        return res.json("Data is required.");
    }
    Order(req.body)
        .save()
        .then((order) => res.json(order));
});

// delete
app.delete("/api/orders/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(() => res.json("Deleted"));
});

// delete all
app.delete("/api/orders/all", (req, res) => {
    Order.deleteMany().then(() => res.json("Deleted All"));
});

if (!dev) {
    app.disable("x-powered-by");
    app.use(compression());
    app.use(morgan("common"));

    app.use(express.static(path.resolve(__dirname, "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

if (dev) {
    app.use(morgan("dev"));
}

app.get("/api/data", (req, res) => {
    const json = { result: "true" };
    res.send(json);
});

const server = createServer(app);
server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`Server started !!`);
});

/*
    NODE_ENV=production node server.js
*/
