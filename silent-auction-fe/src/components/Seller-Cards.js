
import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { ItemContext } from '../contexts/ItemContext';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import DateTimeForm from "../components/DateTimeForm";
import Timer from "react-compound-timer";

const Container = styled.div`
box-shadow: 5px 5px 15px black;
background-color: #f4f9e9;
border: 1px #f4f9e9 solid;
border-radius: 10px;
padding: 0 0 0.5rem;
max-width: 400px;
margin: 1rem 0;
`;

const Page = styled.div`
border: 2px #80808059 solid;
align-items: baseline;
border-radius: 3px;
padding: 0.5rem 0;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
`
const ImageContainer = styled.img`
width: 100%;
height: 300px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
`
const DataContainer = styled.div`
background-color: #f4f9e9;
display: flex;
flex-direction: column;
align-items: flex-start;
div{
    padding:.5rem;
}

`;
const TimerStyle = styled.div`
border: 2px 0px green solid;
border-radius: 100%;
`
const Price = styled.div` 
display: flex;
font-weight: 600;
`


const Des = styled.div`
text-align: left;
max-width: 100%;
`

const AddItemButton = styled.button`
background-color: #f4f9e9;
width: 100%;
padding: 1rem;
border: 2px #19647e solid;
margin: .5rem 5rem;
border-radius: 10px;
font-weight: 600;

&:hover {
    background-color: #550c18;
    color: #f4f9e9;
}
`

const SellerCard = prop => {
    const [itemData, setUserData] = useState([]);
    const { push } = useHistory();
    //Finding id of the itemList

    // const item=prop.itemData.find(
    //     (itemId)=> (itemId.item_id)===prop.match.params.id
    // )
    const id = useParams();

    const Prop = useContext(ItemContext);


    useEffect(() => {
        setUserData(Prop.itemData)
        console.log("prope",Prop);
    }, [])
    const deleteItem = (e,itemId) => {
        console.log("itemid",itemId);
        e.preventDefault();
        console.log(e.target);
        axios
            .delete(`https://bw-silent-auction-pt.herokuapp.com/items/${itemId}`)
            .then((res) => {
              //  prop.setUserData(res.data);
               // push(`/SellerCard`);
               console.log(res);
               
               push(`/SellerCard`);
            })
            .catch((err) =>
                console.log("delete error", err));
    }
    const editItem = (e,itemId) => {

        push(`/update-item/${itemId}`);

    }
    const addItem = (e) => {
        push(`/item-form/`);
    }


    return (
        <Page>
            <AddItemButton onClick={() => push("/item-form/")}>Add Item</AddItemButton>
            {
                itemData.map((item, index) => {

                    const passedTime = Date.now() - item.timer;

                    const remainedTime = item.timer_length - passedTime;
                    console.log('remainedTime', remainedTime);
                    return <Container key={index}>
                        {/* {console.log('time', item.timer_length - (Date.now - item.timer))} */}



                        <ImageContainer src={item.image_url} alt='item-imag' />
                        <DataContainer>

                            <Price>
                                {item.itemState == true ? <><div>Current Bid: ${item.price}</div></> : <div>${item.price}</div>}
                            </Price>
                            <Des>
                                <div>{item.item_name}</div>
                                <div>{item.description}</div>
                                <div>{item.item_id}</div>
                                 <div>{item.seller_id}</div>
                               
                
                            </Des>

                            <div>
                                <TimerStyle>
                                    {/* <PlaceBid item={item} /> */}

                                    {/* <DateTimeForm /> */}
                                    <Timer
                                        initialTime={remainedTime}
                                        direction="backward"
                                    >
                                        {
                                            () => (
                                                <>
                                                    <Timer.Days /> days
                                                <Timer.Hours /> hours
                                                <Timer.Minutes /> minutes
                                                <Timer.Seconds /> seconds
                                            </>
                                            )
                                        }
                                    </Timer>
                                </TimerStyle>
                                <button onClick={e=>(editItem(e,item.item_id))}>Edit</button>
                                <button onClick={e=>(deleteItem(e,item.item_id))}>Delete</button>
                            </div>
                        </DataContainer>
                    </Container>
                }
                )
            }
        </Page>
    )


}

export default SellerCard;