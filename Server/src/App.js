import express from "express";
import cors from "cors";




const app=express();

app.get('/',(req, res) => {
    res.json({"message":"WELCOME TO THE HOME ROTE"});
});

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


export default app;

