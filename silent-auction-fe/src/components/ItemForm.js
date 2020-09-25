import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";
import UploadImage from "./UploadImage";
import DateTimeForm from "./DateTimeForm";
import { axiosWithAuth } from '../axiosAuth';
import axios from "axios";
import { useParams } from "react-router-dom";
import { ItemContext } from '../contexts/ItemContext';



const initialItem = {
    // seller_id: '1',
    item_name: "",
    description: "",
    price: "",
    image_url: "https://i.ytimg.com/vi/Wn0Ze6VNqYM/maxresdefault.jpg",
    timer_length: 500000000,
    timer: 1600723599125,
    itemState: false
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
width:200px;
height: 200px;
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
  background-color: #f4f9e9;
  border: 1px solid #28afb0;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const ItemForm = (props) => {

    const [item, SetItem] = useState(initialItem);
    // const { id } = useParams();
    // console.log("id", id);


    const Prop = useContext(ItemContext);


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
            [ev.target.name]: value,
            timer: Date.now()
        });


    };

    useEffect(() => Prop.addingItemSetter(true), [])
    const handleSubmit = e => {
        e.preventDefault();
        // console.log('seller id on itemForm:', Prop.loginData.seller_id)
        // console.log("Items", item);

        axios.post(`https://bw-silent-auction-pt.herokuapp.com/sellers/${Prop.loginData.seller_id}/items`, item)
            .then(res => {
                console.log('uploaded res', res)
                Prop.addingItemSetter(false)
                props.history.push('/SellerCard')
            }
            ).catch(err => console.log('err', err))


    }
    const imageHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
            // Ready state 0 means "EMPTY", Readystate 1 means "LOADING" readystate 2 means "DONE"
            if (reader.readyState === 2) {
                console.log("image", reader.result)
                SetItem({
                    ...item,
                    image_url: reader.result,
                    timer: Date.now()

                })


            }
        }
        reader.readAsDataURL(e.target.files[0])
        console.log("image", reader.result)
        // SetItem({
        //     ...item,
        //     image_url: 'namd'
        // })
    }

    return (
        <Form>
            {console.log("item", item)}
            <h1>Add Item</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="item_name"
                    onChange={changeHandler}
                    placeholder="Name"
                    value={item.item_name}
                />
                <Input
                    type="number"
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

                <input
                    type="file"
                    name="imageurl"
                    accept="image/*"
                    id="input"
                    onChange={imageHandler}
                // style={{ color: "#19647E" }}
                />

                <DateTimeForm item={item} setItem={SetItem} />

                <Input
                    type="text"
                    name="description"
                    onChange={changeHandler}
                    placeholder="Description"
                    value={item.description}
                />
                <button>Add Item</button>
            </form>
        </Form>
    );

};

export default ItemForm;