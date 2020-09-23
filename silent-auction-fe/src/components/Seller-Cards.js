
import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { ItemContext } from '../contexts/ItemContext';
import { useHistory } from "react-router-dom";
import axios from "axios";
import DateTimeForm from "../components/DateTimeForm";

const Container = styled.div`
border: 1px #80808059 solid;
border-radius: 10px;
padding: 0 0 0.5rem ;
max-width: 400px;
margin: 1rem 0;

`
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

max-width: 100%;
max-hight: 1200px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
`
const DataContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
div{
    padding:.5rem;
}

`
const Timer = styled.div`
border: 2px green solid;
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
width: 100%;
padding: 1rem;
border: 2px Pink solid;
margin: .5rem 5rem;
border-radius: 10px;
font-weight: 600;

`

const SellerCard = prop => {
    const [itemData, setUserData] = useState([]);
    const { push } = useHistory();
    //Finding id of the itemList
    
    // const item=prop.itemData.find(
    //     (itemId)=> (item.id)===prop.match.params.id
    // )


    const Prop = useContext(ItemContext);

    useEffect(() => {
        setUserData(Prop.itemData)
    }, [])
    const deleteItem = (e) => {
        e.preventDefault();
        axios
            .delete(``)
            .then((res) => {
                prop.setUserData(res.data);
                /* */
            })
            .catch((err) =>
                console.log("delete error", err));
    }
    const editItem = (e) => {
        push(`/update-item/${itemData.id}`);

    }
    const addItem=(e)=>{
        push(`/sellers/1/item-form`);
    }

    return (
        <Page>
            <AddItemButton onClick={addItem}>Add Item</AddItemButton>
            {
                itemData.map((item, index) =>
                    <Container key={index}>
                        <ImageContainer src={item.img} alt='item-imag' />
                        <DataContainer>

                            <Price>
                                {item.price.bidState == true ? <><div>Current Bid: ${item.price.price}</div><div>Bidder: {item.biderName}</div></> : <div>${item.price.price}</div>}
                            </Price>
                            <Des>
                                <div>{item.item_description}</div>
                            </Des>

                            <div>
                                <Timer>{item.timer}</Timer>
                             
                                 <button onClick={editItem}>Edit</button> 
                                <button onClick={deleteItem}>Delete</button>
                            </div>
                        </DataContainer>
                    </Container>
                )
            }
        </Page>
    )


}

export default SellerCard;