import { Router } from "express";
import products from "../models/Product.js";

export const router = Router();

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

// get one product
router.get("/:id", (req, res, next) => {
    try {
        const product = products.find(prod => prod.id === req.params.id);

        if(!product){
            return res
                    .status(404)
                    .json({error: "Product not found"});
        }

        res.json(product);
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
});

// update product
router.put("/:id", (req, res, next) => {
    try {
        const product = products.find(prod => prod.id === req.params.id);

        if(!product){
            return res
                    .status(404)
                    .json({error: "Product not found"});
        }

        const {name, price, quantity} = req.body;
        // validate กันส่งค่า 0
        if(name) product.name = name;
        if(price !== undefined) product.price = Number(price);
        if(quantity !== undefined) product.quantity = Number(quantity);

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// del product
router.delete("/:id", (req, res, next) => {
    try {
        const index = products.findIndex(prod => prod.id === req.params.id);
        
        if (index === -1) {
            return res
                    .status(404)
                    .json({error: "Product not found"});
        };

        products.splice(index, 1);

        res.json({message: "Deleted Product"});
    } catch (err) {
        next(err);
    }
})