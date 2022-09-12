import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Link} from 'react-router-dom';

import Card from "./Card";

import * as actions from '../redux/actions';





export default function Main(){

    const pokemon = useSelector(state=> state.pokemons);
    const dispatch = useDispatch();
    const pokemonName = useSelector(state=> state.pokemonByName);
    const types = useSelector(state => state.types);
    //-------------------------PAGINADO---------------
    
    const {page, min, max} = useSelector(state => state.pagination)
    const [pagination, setPagination] = useState([ ...pokemon.slice(min,max)])

    useEffect(()=>{

        //dispatch(actions.init())
        setPagination([...pokemon.slice(min,max || pokemon.length)])

    },[dispatch,min,max,pokemon])
    //------------------------------------------------



    const search = (e)=>{
        let name = document.getElementById('namePokemon').value;
        if(name){
            dispatch(actions.fetchPokemonsByName(name))
            
        }
    }
    const clear = (e)=>{
        dispatch(actions.clearName([]))
    }
    const next = (e)=>{
        console.log(page, min, max)
        if(page < 4){
            dispatch(actions.next())
            
        }
        
    }
    const prev = (e)=>{
        console.log(page, min ,max)
        if(page !== 1){
            dispatch(actions.prev())
            
        }
        
    }
    const highAttack = (e)=>{
        dispatch(actions.highAttack())
    }
    const lowAttack =(e)=>{
        dispatch(actions.lowAttack())
    }
    
    const alfaOrder = (e)=>{
        const alfa = e.target.value;
        console.log(alfa);
        if(alfa){
            dispatch(actions.clearPokemons());
            dispatch(actions.alfaOrder(alfa));
        }


    }
    const db = (e)=>{
    // trae los pokemons de la base
    }

    const api = (e)=>{
        dispatch(actions.pokemonsApi())
    }


    

    return(
        <main>
            <section>
                <div>
                <input id="namePokemon" type={'text'} name={'nombre'} placeholder={'...'} />
                <button onClick={search}>Buscar</button>
                <button onClick={clear}>Limpiar</button>
                </div>
                <div>
                    
                    <p>order</p>
                    <button onClick={highAttack}>↑Ataque</button>
                    <button onClick={lowAttack}>↓Ataque</button>
                    <select name="Alfaoption" required={true} onChange={alfaOrder}>
                        <option value={undefined}>Elegir</option>
                        <option value={'asc'}>↑Alfa</option>
                        <option value={'desc'}>↓Alfa</option>
                    </select>

                </div>
                <div>
                    <p>filters</p>
                    <select name="types" >
                        {
                            types.map((e, index)=> <option key={index} value={e.name}>{e.name}</option> )
                        }
                    </select>
                    <button>DB</button>
                    <button onClick={api}>API</button>
                </div>
                <div>
                    <p>Crear</p>
                    <Link to={'/Post'}><button>Crear</button></Link>
                </div>
            </section>
            <section>
                
                {
                   Array.isArray(pokemonName)  ?  pagination.map((e,index)=><button key={index}>
                        <Link to={`/Detail/${e.id}`}>
                            <Card 
                            id={e.id} 
                            name={e.name} 
                            types={e.types} 
                            attack={e.attack} 
                            image={e.image} 
                            ></Card>
                            </Link>
                        
                        </button>) : typeof pokemonName === 'object' ? 
                        
                        <div>
                        <button>
                            <Link to={`/Detail/${pokemonName.id}`}>
                                <Card
                                id={pokemonName.id}
                                name={pokemonName.name}
                                types={pokemonName.types}
                                attack={pokemonName.attack}
                                image={pokemonName.image}
                                ></Card>
                            </Link>
                            </button>
                        </div>
                    : <p>Loagind...</p>
                }
                <button onClick={prev}>Anterior</button>
                <button onClick={next}>Siguiente</button>
                
                
            </section>
        </main>
    )


}
