import React , { useEffect } from "react";
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import {Link} from 'react-router-dom';




export default function Home(){
    //Css
    const buttonInit = {
        
        backgroundColor : 'cyan',
        height: '150px',
        width: '150px',
        borderRadius: '100px',
        borderColor: 'black',
    }
    const linkStyle = {
        textDecoration: 'none',
        fontSize: '100%'
    }
    
    const divStyled = {
        
    }






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
        dispatch(actions.fetchMoves())
        
    },[dispatch]);

    console.log(store.getState())

    return (
        <div>
            <button  style={buttonInit}>
                <Link style={linkStyle} to='/Main'>Acceder</Link>
            </button>
        </div>
    )




}