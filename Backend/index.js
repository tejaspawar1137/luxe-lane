const express=require("express")
const dotenv=require('dotenv')
const connectToDB = require("./Db/db")
const userRoutes=require("./routes/userRoutes")
const productRoutes=require("./routes/productRoutes")
const orderRoutes=require("./routes/orderRoutes") 
const cors=require("cors")
const app=express()
 
app.use(cors());

app.use(express.json())
dotenv.config()
const port=process.env.port || 4000

//Routes
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/order",orderRoutes) 

app.listen(port,()=>{
    console.log(`Backend started succesfully at http://localhost:${port}`)  
})

connectToDB();

