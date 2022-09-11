import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import * as actions from '../redux/actions';

import store from '../redux/store';

import validator from 'validator';



export default function Detail(){

    const pokemon = useSelector(state => state.pokemonById);
    const {id} = useParams();
    const dispatch = useDispatch();
    

    useEffect(()=>{
        
        axios.get(`http://localhost:3001/pokemons/${id}`)
            .then(r => r.data)
            .then( data => dispatch(actions.idPokemon(data)))
            .catch(e=> console.log(e));
            console.log(store.getState());
            return ()=>{
                dispatch(actions.clearId(undefined));
                console.log(store.getState())
                
            }
        
    },[id,dispatch]);


    
    return(
        <section>
            {
                pokemon ? <div>
                <h3>{pokemon.name}</h3>
                    <img src={pokemon.image} alt='Imagen de pokemon'></img>

                    <h4>{pokemon.id}</h4>
                    <p>{pokemon.attack}</p>
                    <p>{pokemon.defense}</p>
                    <p>{pokemon.speed}</p>
                    <p>{pokemon.hp}</p>
                    <p>{pokemon.height}</p>
                    <p>{pokemon.weight}</p>
                    <ul>
                        {
                            pokemon.types.map((type, index)=> <li key={index} >{type}</li>)
                        }
                    </ul>
                    
                    </div> : <p>Loading...</p>
            }
        </section>
    )


}