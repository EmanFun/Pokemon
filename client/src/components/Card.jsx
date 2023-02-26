import React from "react";

import style from '../Style/Card.module.css'




export default function Card({id,name,image,types,attack}){





    return(
        <div className={style.cardContainer}>
            <h4>N°{id.length > 3 ? id.slice(0,3) : id}</h4>
            <img className={style.pokeImage} src={image} alt={`Pokemon ${name}`}></img>
            <h3 className={style.name}>{name}</h3>
            <ul >{
                types.map((e,index)=>{
                    return typeof e !== 'object' ? (<li className={style.types} key={index} >{e}</li>): (<li key={index}>{e.name}</li>)
                })
            }</ul>
            <p className={style.attackPoints} >Puntos de ataque: {attack} &#9876;</p>
        </div>
    )


}