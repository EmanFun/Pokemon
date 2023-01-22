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
                    <p>ID#</p>
                    <h4>{pokemon.id}</h4>
                    <span>Ataque</span>
                    <p>{pokemon.attack}</p>
                    <span>Defensa</span>
                    <p>{pokemon.defense}</p>
                    <span>Speed</span>
                    <p>{pokemon.speed}</p>
                    <span>Vida</span>
                    <p>{pokemon.hp}</p>
                    <span>Altura</span>
                    <p>{pokemon.height}</p>
                    <span>Peso</span>
                    <p>{pokemon.weight}</p>
                    <p>Movimientos</p>
                    <ul>
                        {
                            pokemon.moves? pokemon.moves.map((e, index)=>{
                                return <li key={index}>{e}</li>
                            }) : <span>Sin Movimientos</span>
                        }
                    </ul>
                    <p>Tipo</p>
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