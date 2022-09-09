import React , { useEffect } from "react";
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';
import store from '../redux/store';





export default function Home(){

    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(actions.fetchPokemons())
    },[dispatch]); 
    useEffect(()=>{
        dispatch(actions.fetchTypes())
        console.log(store.getState())
    },[dispatch]);

    

    return (
        <div>
            <button>Ingresar</button>
        </div>
    )




}