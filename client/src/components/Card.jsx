import React from "react";





export default function Card({id,name,image,types,attack}){





    return(
        <div>
            <h4>N°{id}</h4>
            <img src={image} height='40px' width={'40px'} alt={`Pokemon ${name}`}></img>
            <h3>{name}</h3>
            <ul>{
                types.map((e,index)=>{
                    return typeof e !== 'object' ? (<li key={index} >{e}</li>): (<li key={index}>{e.name}</li>)
                })
            }</ul>
            <p>Puntos de ataque: {attack}</p>
        </div>
    )


}