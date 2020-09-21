import React, { useState,useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

const initialItem = {
    name: "",
    price: "",
    imageUrl: "",
    description: ""
};
const Uploadimg = styled.img`
width:200px;
height: 200px;`

const Form=styled.div`
display: flex;
flex-direction: column;
width: 100%;
max-width: 300px;
margin: 0 auto;
padding-top:30px;`

const UpdateForm=(props)=>{
    const {push}=useHistory();
    const [item,setItem]=useState(initialItem);
    const {id}=useParams();

    useEffect(()=>{
        axios
        .get(`${id}`)
        .then((res)=>{
            setItem(res.data);
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
        .put(`${id}`,item)
        .then((res)=>{
            console.log("Update item",res.data)
            props.setItem(res.data);
            push(`/item-list/${id}`);
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
                    imageUrl:reader.result
                    
                })
                console.log("item",item);
                
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

   return (
        <Form>
           
            <form onSubmit={handleSubmit}>
                <input type="text"
                        name="name"
                        onChange={changeHandler}
                        placeholder="name"
                        value={item.name}
                         />
                <input type="number"
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
              
                  <Uploadimg src={item.imageUrl} alt="Upload Image"></Uploadimg>
                 
               <input type="file"
                    name="imageurl"
                    accept="image/*"
                    id="input"
                    onChange={imageHandler}/>
                     
              
             
                   

                <input type="text"
                        name="description"
                        onChange={changeHandler}
                        placeholder="description"
                        value={item.description}
                         />
                         <button>Add Item</button>

            </form>

        </Form>
    )
}
export default UpdateForm;