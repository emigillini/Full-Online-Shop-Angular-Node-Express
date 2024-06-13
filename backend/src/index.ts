import  express  from "express";

const app=express()
app.use(express.json())
const PORT = 3000

app.get("/api",(req, res)=>{
    const hiUser= "Hello New User"
    res.send(hiUser)
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})