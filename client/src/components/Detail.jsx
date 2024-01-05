import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import * as actions from '../redux/actions';

import store from '../redux/store';

import validator from 'validator';

import style from '../Style/Detail.module.css'


export default function Detail(){

    const pokemon = useSelector(state => state.pokemonById);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(()=>{
        
        axios.get(`https://pokemon-production-2708.up.railway.app/pokemons/${id}`)
            .then(r => r.data)
            .then( data => dispatch(actions.idPokemon(data)))
            .catch(e=> console.log(e));
            console.log(store.getState());
            return ()=>{
                dispatch(actions.clearId(undefined));
                console.log(store.getState())
                
            }
        
    },[id,dispatch]);

    const back =()=>{
        history.push('/Main')
    }
    
    return(
        <section className={style.containerDetail} >
            
            <article className={style.detailCard} >
            {
                pokemon ? <div className={style.divDetail}> <button className={style.backButton} onClick={back}>Back</button>
                    <div className={style.titleImage}>
                        <h3 className={style.title}>{pokemon.name}</h3>
                        <img className={style.image} src={pokemon.image} alt='Imagen de pokemon'></img>
                    </div>
                    <div className={style.divProps}>

                        <p className={style.props} >ID# {pokemon.id}</p>

                        <p className={style.props}>Ataque {pokemon.attack}</p>

                        <p className={style.props}>Defensa {pokemon.defense}</p>

                        <p className={style.props}>Speed {pokemon.speed}</p>

                        <p className={style.props}>Vida {pokemon.hp}</p>

                        <p className={style.props}>Altura {pokemon.height}</p>

                        <p className={style.props}>Peso {pokemon.weight}</p>
                    </div>
                    <div className={style.containerMovesAndType} >
                        <p>Movimientos</p>
                        <ul className={style.lists}>
                            {
                                pokemon.moves? pokemon.moves.map((e, index)=>{
                                    return <li className={style.listItem}  key={index}>{e}</li>
                                }) : <span>Sin Movimientos</span>
                            }
                        </ul>
                        <p>Tipo</p>
                        <ul className={style.lists}>
                            {
                                pokemon.types.map((type, index)=> <li className={style.type} key={index} >{type}</li>)
                            }
                        </ul>
                    </div>
                    
                    </div> : <p className={style.loading} >Loading...</p>
            }
            </article>
        </section>
    )


}
