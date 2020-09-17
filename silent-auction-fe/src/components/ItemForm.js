import React, { useState } from "react";
import axios from "axios";

const initialItem = {
    name: "",
    price: "",
    imageUrl: "",
    description: ""
};

const itemForm = props => {

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
        

    }
    const handleSubmit = e => {
        ev.preventDefault();
        console.log("Items",item);
        axios.post("",item);
        console.log("Item got posted",item);
        
    }
    return (
        <div>
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
                <input type="text"
                        name="imageUrl"
                        onChange={changeHandler}
                        placeholder="imageUrl"
                        value={item.imageUrl}
                         />
                <input type="text"
                        name="description"
                        onChange={changeHandler}
                        placeholder="description"
                        value={item.description}
                         />

            </form>

        </div>
    )

}