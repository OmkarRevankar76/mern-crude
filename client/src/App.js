import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "./App.css"

function App() {
  const [img,setImage]=useState("")
  const [title,setTitle]=useState("")
  const [price,setPrice]=useState(0)
  const [newProductName,setNewProductName]=useState("")
  const [newPrice,setNewPrice]=useState(0)

  const [productList,setProductList]=useState([])


  useEffect(()=>{
  Axios.get("http://localhost:3001/read").then((response)=>{

setProductList(response.data)

  })
  },[])
  const addToList=()=>{
   Axios.post("http://localhost:3001/insert",{
     imageHead:img,
     titleHead:title,
     priceHead:price
   })
  }


  const updateProduct=(id)=>{
    Axios.put("http://localhost:3001/update",{id:id,newProductName:newProductName})
  }


  const updatePrice=(id)=>{
    Axios.put("http://localhost:3001/updatePrice",{id:id,newPrice:newPrice})
  }

 
  return (
   
    <>
    <h1 className='MainHeading'>product List</h1>
    <div className='theMainContainer'>
     
    <div className='containerTwo'>
    
    {productList.map((val,key)=>{
      return<div className='productDiv' key={key}>
        <img src={val.images}/>
        <p className='productName' >{val.productName}</p>
        <p className='productPrice'>Rs {val.price}</p>

        {/* update */}
        <input type="text" onChange={(event)=>{setNewProductName(event.target.value)}} />
        <button onClick={()=>updateProduct(val._id)}>update Title</button>
        <br/>
        <input type="text" onChange={(event)=>{setNewPrice(event.target.value)}} />
        <button onClick={()=>updatePrice(val._id)}>update Price</button>
        
        </div>
    })}
    </div>


    <div className='containerOne'>
    <h1 className='heading'>ADD PRODUCTS</h1>
    <div className='productContainer'>
     
      <div className='product'>
        <h1 className='headingTop'>Image URL</h1>
        <input onChange={(event)=>{setImage(event.target.value)}} type="text"/>
        <h1 >Product Name</h1>
       <input onChange={(event)=>{setTitle(event.target.value)}} type="text"/>
       <h1 >Price</h1>
       <input  onChange={(event)=>{setPrice(event.target.value)}} type="number"/>
       <br/>
       
       <button onClick={addToList}>Add</button>

       </div>

       
    </div>
    </div>
    </div>

    </>
  )
}

export default App