import { Router } from "express";

let products = require("../models/Product.js");

const router = Router();

// endpoint products
router.get("/", (req, res, next) => {
    try {
        let result = [...products];
        
        if(req.query.name){
            const searchName = req.query.name.toLowerCase();
            result = result.filter(prod => prod.name.toLowerCase().includes(searchName));
        }

        if(req.query.sortBy === "price"){
            result.sort((a, b) => a.price - b.price);
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
});

// add product
router.post("/", (req, res, next) => {
    try {
        const {name, price, quantity} = req.body;

        if(!name || price === undefined){
            return res
                    .status(400)
                    .json({error: "Product neme and price are required!"});
        }

        if(Number(price) < 0 || (quantity !== undefined && Number(quantity) < 0)){
            return res
                    .status(400)
                    .json({error: "Product price and quantity must not negative"});
        }

        const newProduct = {
            id: String(Date.now()),
            name,
            price: Number(price),
            quantity: quantity !== undefined ? Number(quantity) : 1
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
        
    } catch (err) {
        next(err);
    }
})