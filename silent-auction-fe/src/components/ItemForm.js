import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";
import UploadImage from "./UploadImage";
import DateTimeForm from "./DateTimeForm";
import { axiosWithAuth } from '../axiosAuth';
import axios from "axios";
import { useParams } from "react-router-dom";
import { ItemContext } from '../contexts/ItemContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { date } from "yup";


const initialItem = {
    // seller_id: '1',
    item_name: "",
    description: "",
    price: "",
    image_url: "https://i.ytimg.com/vi/Wn0Ze6VNqYM/maxresdefault.jpg",
    timer_length: Date.now(),
    timer: Date.now(),
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


const ItemForm = (props) => {





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
    const [selectedDisplay, setSelectedDisplay] = useState(Date.now());
    const [timerLength, setTimerLength] = useState()
    // const [calendarClose, setCalendarClose] = useState(false);
    const handleCalendarClose = () => {

        SetItem({
            ...item,
            timer_length: timerLength,
            timer: Date.now()
        });
    }
    // const handleCalendarOpen = () => setCalendarClose(false);
    const datePickerChnangeHandler = e => {
        console.log(e)
        console.log(Date.parse(e));
        console.log(Date.parse(e) - Date.now())
        setTimerLength(Date.parse(e) - Date.now());
        setSelectedDisplay(e);


        // SetItem({
        //     ...item,
        //     timer_length: length,
        //     timer: Date.now()
        // });

    }


    useEffect(() => Prop.addingItemSetter(true), [])
    const handleSubmit = e => {
        e.preventDefault();
        // console.log('seller id on itemForm:', Prop.loginData.seller_id)
        console.log("Items", item);

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

    }

    return (
        <Form>
            {console.log("item in itemForm", item)}
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



                <Uploadimg src={item.image_url} alt="Upload Image"></Uploadimg>

                <Input
                    type="file"
                    name="imageurl"
                    accept="image/*"
                    id="input"
                    onChange={imageHandler}
                // style={{ color: "#19647E" }}
                />
                <div>When will the auction end?</div>
                <DatePicker
                    selected={selectedDisplay}
                    onChange={datePickerChnangeHandler}
                    onCalendarClose={handleCalendarClose}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={20}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                />

                {/* <DateTimeForm item={item} setItem={SetItem} /> */}

                <Input
                    type="text"
                    name="description"
                    onChange={changeHandler}
                    placeholder="Description"
                    value={item.description}
                />
                <br />
                <Button>Add Item</Button>
            </form>
        </Form>
    );

};

export default ItemForm;