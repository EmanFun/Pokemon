import React , { useEffect } from "react";
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import {Link} from 'react-router-dom';




export default function Home(){

    const dispatch = useDispatch();
    //crear un retardo animacion de aprox 10 segundos o lo que dure la peticion request

    useEffect(()=>{
        dispatch(actions.fetchPokemons())
        return()=>{
            dispatch(actions.reloadPokemon());
        }

    },[dispatch]); 
    useEffect(()=>{
        dispatch(actions.fetchTypes())
        
    },[dispatch]);

    console.log(store.getState())

    return (
        <div>
            <button>
                <Link to='/Main'>Ingresar</Link>
            </button>
        </div>
    )




}