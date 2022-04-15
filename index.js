const express=require("express")
const mongooose=require("mongoose")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())


const Product=require("./models/product.js")



//

mongooose.connect("mongodb+srv://admin:Qn18ulz1qmDsgg6Q@cluster0.sdfdw.mongodb.net/shoppingCRUD?retryWrites=true&w=majority",()=>{
    console.log("connected to the db")
})

//router


app.post("/insert",async(req,res)=>{

    const image=req.body.imageHead
const title=req.body.titleHead
const price=req.body.priceHead
  const products=new Product({
    productName:title,
    price:price,
    images:image
})

try{
  await products.save()
  res.send("inserted data")
}catch(err){
console.log(err)
}


})





app.get("/read",async(req,res)=>{

  Product.find({},(err,result)=>{
      if(err){
          res.send(err)
      }


      res.send(result)
  })


})




//update product title name
app.put("/update",async(req,res)=>{

    const image=req.body.imageHead
const newProductName=req.body.newProductName
const id=req.body.id


try{
  await Product.findById(id,(err,updatedProduct)=>{
    updatedProduct.productName= newProductName
    updatedProduct.save()
    res.send("update")
  })
}catch(err){
console.log(err)
}


})


//update price

app.put("/updatePrice",async(req,res)=>{

    const image=req.body.imageHead
const newPrice=req.body.newPrice
const id=req.body.id


try{
  await Product.findById(id,(err,updatedPrice)=>{
    updatedPrice.price= newPrice
    updatedPrice.save()
    res.send("update")
  })
}catch(err){
console.log(err)
}


})


const port=process.env.PORT || 3001
app.listen(port,()=>{
    console.log("running on the port")
})