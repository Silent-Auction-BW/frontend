import React, { useState } from "react";
import axios from "axios";


const initialItem = {
    name: "",
    price: "",
    imageUrl: "https://i.ytimg.com/vi/Wn0Ze6VNqYM/maxresdefault.jpg",
    description: ""
};

const ItemForm = () => {

    const [item, SetItem] = useState(initialItem);

    const changeHandler = ev => {

        ev.persist();
        var value = ev.target.value;

        //Converting the value of price to integer

        if (ev.target.value === 'price') {
            value = parseInt(value, 10);
        }

        //Setting the values to setItem using spread operator

        SetItem({
            ...item,
            [ev.target.name]: value
        });
        

    };
    const handleSubmit = e => {
        e.preventDefault();
        console.log("Items",item);
        //Waiting for axios link to posted
      //  axios.post("",item);
        console.log("Item got posted",item);
        
    }
    const imageHandler=e=>{
        const reader=new FileReader();
        reader.onload=()=>{
            // Ready state 0 means "EMPTY", Readystate 1 means "LOADING" readystate 2 means "DONE"
            if(reader.readyState===2){
                SetItem({
                    ...item,
                    imageUrl:reader.result
                    
                })
                console.log("item",item);
                
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    
    return (
        <div className="form">
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                        name="name"
                        onChange={changeHandler}
                        placeholder="name"
                        value={item.name}
                         />
                <input type="text"
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
               <img src={item.imageUrl} alt="Upload Image"></img>
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

        </div>
    )

};

export default ItemForm;