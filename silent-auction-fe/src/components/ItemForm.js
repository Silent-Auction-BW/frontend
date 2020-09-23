import React, { useState } from "react";

import styled from "styled-components";
import UploadImage from "./UploadImage";
import DateTimeForm from "./DateTimeForm";
import { axiosWithAuth } from '../axiosAuth';
import axios from "axios";


const initialItem = {
   // seller_id: '1',
    name: "",
    description: "",
    price: "",
    image_url: "https://i.ytimg.com/vi/Wn0Ze6VNqYM/maxresdefault.jpg",
    timer: ""
};

// const initialItem =  {

//     item_name: 'Apple',
//     price: { bidState: true, price: 100 },
//     item_description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
//     img: 'https://i.ytimg.com/vi/Wn0Ze6VNqYM/maxresdefault.jpg',
//     timer: '15:00 min',
//     item_id: 0,
//     seller_id: 'William',
//     biderName: 'Tim'
//   }


const Uploadimg = styled.img`
width:400px;
height: 400px;
display: flex;
flex-direction: column;`

const Form = styled.div`
display: flex;
flex-direction: column;
width: 100%;
max-width: 800px;
margin: 0 auto;
padding-top:30px;`

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
        console.log("Items", item);
        //Waiting for axios link to posted
        //  axios.post("",item);
     axios.post('https://bw-silent-auction-pt.herokuapp.com/sellers/1/items', item)
            .then(res => {
                console.log(res)
            }
            ).catch(err => console.log('err', err))
        // console.log("Item got posted", item);

    }
    const imageHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
            // Ready state 0 means "EMPTY", Readystate 1 means "LOADING" readystate 2 means "DONE"
            if (reader.readyState === 2) {
                SetItem({
                    ...item,
                    image_url: reader.result

                })
                console.log("item", item);

            }
        }
        reader.readAsDataURL(e.target.files[0])
        // SetItem({
        //     ...item,
        //     image_url: 'namd'
        // })
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

                <Uploadimg src={item.image_url} alt="Upload Image"></Uploadimg>

                <input type="file"
                    name="imageurl"
                    accept="image/*"
                    id="input"
                    onChange={imageHandler} />



                <DateTimeForm item={item} setItem={SetItem} />

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

};

export default ItemForm;