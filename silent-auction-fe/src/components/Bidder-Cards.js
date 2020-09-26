
import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { ItemContext } from '../contexts/ItemContext';
import Timer from 'react-compound-timer';
import axios from "axios";
import { axiosWithAuth } from '../axiosAuth';


const Container = styled.div`
box-shadow: 5px 5px 15px black;
background-color: #f4f9e9;
border: 1px #f4f9e9 solid;
border-radius: 10px;
padding: 0 0 0.5rem ;
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
display: flex;
flex-direction: column;
align-items: flex-start;
div{
    padding:.5rem;
}

`
const TimerStyle = styled.div`


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
    const [show, toggleShow] = useState(false);
    const[bidPrice,setBidPrice]=useState();

    const Prop = useContext(ItemContext);

    useEffect(() => {

        setUserData(Prop.itemData)
        console.log("propbidder",itemData);
        console.log("props_bidder",Prop);
    }, [])

    
   
    const bidchange=(e,id)=>{
       
        let newArray = itemData.map(el => {
            if(el.item_id == id){
                var pr=Number(el.price);
                console.log(pr);
                if(e.target.value>pr){
                    el.bidPrice= e.target.value;
                }
                
            }
            return el;
        })
        setUserData(newArray);
        console.log(itemData)
    }
    const finalBid=(e,id)=>{
        let bidItem=itemData.map(item=>{
            if(item.item_id==id){
console.log("ammount",item.bidPrice);
              axios
                .post(`https://silenta-auction-bw.vercel.app/items/2/bidder/3`,{ammout:item.bidPrice})
                .then(res=>{
                    console.log("result",res);
                })
                .catch(err=>{
                    console.log("err",err);
                })
                
               console.log(item);
              
               
            }
            return item;
        })

    }


    return (
        <Page>

            {
                itemData.map((item, index) => {
                    const passedTime = Date.now() - item.timer;

                    const remainedTime = item.timer_length - passedTime;
                    return <Container key={index}>
                        <ImageContainer src={item.image_url} alt='item-imag' />
                        <DataContainer>

                            <Price>
                                {item.itemState == true ? <><div>Current Bid: ${item.price}</div></> : <div>${item.price}</div>}
                            </Price>
                            <Des>
                                <div>{item.item_name}</div>
                                <div>{item.description}</div>
                                <div>{item.seller_id && <>Seller ID: {item.seller_id}</>}</div>
               
               
                            </Des>
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
                            <div>

                                {/* <PlaceBid item={item}/> */}
                                {/* <input key={index} type="number" onChange={handleOnChange} ></input>
                                {show && <button>Hi there</button>} */}
                                 <input type="number" id= {index} name="Bidprice" onChange={e=>bidchange(e, item.item_id)} key={index}  /> 
                                 {

                                    item.bidPrice>0 ? <button id={index} onClick={e=>finalBid(e,item.item_id)}>Bid</button>:null

                                 }
                                
                                </div>
                                
                                    
                        </DataContainer>
                    </Container>
                })
            }
        </Page >
    )


}

export default BidderCard;