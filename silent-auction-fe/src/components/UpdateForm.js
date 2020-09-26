import React, { useState,useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { axiosWithAuth } from '../axiosAuth';

const initialItem = {
    item_name: "",
    description: "",
    price: "",
    image_url: "",
    timer_length: 500000000,
    timer: 1600723599125,
    itemState: false
};
const Uploadimg = styled.img`
width:200px;
height: 200px;
border: 2px solid #f4f9e9;
`

const Form = styled.div`
  box-shadow: 5px 5px 10px black;
  background-color: #19647e;
  border: 1px solid black;
  color: #f4f9e9;
  margin: 0 auto;
  width: 300px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  height: 500px;
`;

const Input = styled.input`
  max-width: 60%;
  color: black;
  background-color: #f4f9e9;
  border: 1px solid #28afb0;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #28afb0;
  border: none;
  border-radius: 25px;
  color: #f4f9e9;
  font-size: 1.2rem;
  margin: 10px 0;
  padding: 3px 10px;

  &:hover {
    background-color: #550c18;
  }
`;

const UpdateForm=(props)=>{
    const {push}=useHistory();
    const [item,setItem]=useState(initialItem);
    const {id}=useParams();
    console.log("id",id);

    useEffect(()=>{
       
    axiosWithAuth()
    .get(`https://bw-silent-auction-pt.herokuapp.com/items/${id}`)
    
        .then((res)=>{
            setItem(res.data[0]);
            
            console.log("image",res.data[0]);
            console.log("item image")
        })
        .catch((err)=>{
            console.log("Error in Useffect",err);
        })
    },[id]);
    

    const changeHandler=(ev)=>{
        ev.persist();
        let value=ev.target.value;
        if(ev.target.name==='price'){
            value=parseInt(value,10);
        }
        setItem({
            ...item,
            [ev.target.name]:value
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios
        .put(`https://bw-silent-auction-pt.herokuapp.com/items/${id}`,item)
        .then((res)=>{
            console.log("Update item",res.data)
         //   props.setItem(res.data);
           // push(`/item-list/${id}`);
           push(`/SellerCard`)
        })
        .catch((err)=>{
            console.log("Update Form Error",err);
        })

    }
    const imageHandler=e=>{
        const reader=new FileReader();
        reader.onload=()=>{
            // Ready state 0 means "EMPTY", Readystate 1 means "LOADING" readystate 2 means "DONE"
            if(reader.readyState===2){
                setItem({
                   ...item,
                    image_url:reader.result
                    
                })
                console.log("item",item);
                
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

   return (
        <Form>
            <h1>Add Item</h1>           
            <form onSubmit={handleSubmit}>
                <Input type="text"
                        name="item_name"
                        onChange={changeHandler}
                        placeholder={item.item_name}
                        value={item.item_name}
                         />
                <Input type="number"
                        name="price"
                        onChange={changeHandler}
                        placeholder="Price"
                        value={item.price}
                         />
               {/*
                <input type="text"
                        name="imageUrl"
                        onChange={changeHandler}
                        placeholder="imageUrl"
                        value={item.imageUrl}
                         />
               */} 
              
                  <Uploadimg src={item.image_url} alt="Upload Image"></Uploadimg>
                 
               <Input type="file"
                    name="imageurl"
                    accept="image/*"
                    id="input"
                    onChange={imageHandler}
                    value={item.imageUrl}/>
                     
              
             
                   

                <Input type="text"
                        name="description"
                        onChange={changeHandler}
                        placeholder="description"
                        value={item.description}
                         />
                         <br/>
                         <Button>Add Item</Button>

            </form>

        </Form>
    )
}
export default UpdateForm;