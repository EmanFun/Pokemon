import React , { useEffect } from "react";
import * as actions from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import {Link} from 'react-router-dom';
//Css
import styles from '../Style/Home.module.css'



export default function Home(){
    const fetchData = useSelector(state => state.allPokemons)
    const dispatch = useDispatch();
    //crear un retardo animacion de aprox 10 segundos o lo que dure la peticion request

    useEffect(()=>{
        dispatch(actions.fetchPokemons())
        return()=>{
            dispatch(actions.reloadPokemon());
        }

    },[dispatch, fetchData ]); 
    useEffect(()=>{
        dispatch(actions.fetchTypes())
        dispatch(actions.fetchMoves())
        
    },[dispatch]);

    console.log(store.getState())
    console.log(fetchData[0], !!fetchData)

    return (


            <div className={styles.containerButton}>
                <button 
                onClick={() => setTimeout(() =>{}, 13000)}
                className={styles.buttonInit}>
                    
                    {
                        fetchData.length ?
                    <Link className={styles.link} to='/Main'>Acceder</Link> 
                    :
                    <span className={styles.link}>Aguarde</span>
                    }
                </button>
            </div>

        
    )




}