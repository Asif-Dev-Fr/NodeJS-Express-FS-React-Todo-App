import React, { useState, useEffect } from 'react';

const Cards = ({ cards }) => {

    const [newList, setNewList] = useState([]);

    useEffect(() => {
        setNewList(cards);
    },[cards])

    const deleteCard = async (id) =>  { 
        try {
            await fetch(`http://localhost:5000/api/card/${id}`, {
                method: "DELETE",
            });
            const fetchNewData = async () => {
                const response = await fetch("http://localhost:5000/api/cards");
                const data = await response.json();
                setNewList(data);
            };
            fetchNewData();
        }  
        catch(err) {
            console.log(err);
        }; 
    };

    return(
        <div className="list">
            <ul > 
                {
                    newList.map((card) => (
                        
                        <li key={card.id}> 
                            <span>{card.message}</span> <span onClick={() => {
                                deleteCard(card.id)
                            }}><i className="fas fa-trash faIcons"></i></span>
                        </li>
                        
                    ))
                }
            </ul>
        </div>
    )
}

export default Cards;