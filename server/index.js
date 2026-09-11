import express from "express";

const app = express();

app.use(express.json());

// custom middleware logger
app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleTimeString();

    console.log(`[${time}] ${method} ${url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Product API is running!")
});

// Centralized error handler
app.use((err, req, res, next) => {
    return res.status(500).json({
        error: "Something went wrong on the server...",
        message: err.message,

    });
    }
); 

const PORT = 3000;
app.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT} 🌏`);
    }
);