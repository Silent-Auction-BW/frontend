
import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { ItemContext } from '../contexts/ItemContext';

const Container = styled.div`
border: 1px #2c242459 solid;
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
const TimerStyle = styled.div`
border: 2px green solid;
border-radius: 100%;
`
const Price = styled.div`
display: flex;
font-weight: 600;
`
const Seller = styled.div`
display: flex;
font-weight: 600;
`

const Des = styled.div`
text-align: left;
`


const BidderCard = prop => {
    const [itemData, setUserData] = useState([])
    const [show, toggleShow] = useState(true);

    const Prop = useContext(ItemContext);

    useEffect(() => {

        setUserData(Prop.itemData)
    }, [])

    const bidHandler = (e) => {

    }
    const handleOnChange = (e) => {
        if (
            e.target.value >= itemData.price
        ) {
            console.log("itemhandle", itemData.price);
        }

        //  toggleShow(!show)}>toggle: {show ? 'show' : 'hide'}
    }

    return (
        <Page>

            {
                itemData.map((item, index) =>
                    <Container key={index}>
                        <ImageContainer src={item.image_url} alt='item-imag' />
                        <DataContainer>

                            <Price>
                                {item.itemState == true ? <><div>Current Bid: ${item.price}</div></> : <div>${item.price}</div>}
                            </Price>
                            <Des>
                                <div>{item.description}</div>
                            </Des>

                            <div>
                                <TimerStyle>{item.timer}</TimerStyle>
                                {/* <PlaceBid item={item}/> */}
                                <input key={index} type="number" onChange={handleOnChange} ></input>
                                {show && <button>Hi there</button>}


                            </div>
                        </DataContainer>
                    </Container>
                )
            }
        </Page >
    )


}

export default BidderCard;