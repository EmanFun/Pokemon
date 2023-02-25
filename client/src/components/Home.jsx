import React , { useEffect } from "react";
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import {Link} from 'react-router-dom';
//Css
import styles from '../Style/Home.module.css'



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
        dispatch(actions.fetchMoves())
        
    },[dispatch]);

    console.log(store.getState())

    return (


            <div className={styles.containerButton}>
                <button  className={styles.buttonInit}>
                    <Link className={styles.link} to='/Main'>Acceder</Link>
                </button>
            </div>

        
    )




}