import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Link, useHistory} from 'react-router-dom';

import Card from "./Card";

import * as actions from '../redux/actions';

import styles from '../Style/Main.module.css'




export default function Main(){


    const history = useHistory();
    const dispatch = useDispatch();

    const pokemon = useSelector(state=> state.pokemons);
    const pokemonName = useSelector(state=> state.pokemonByName);
    const types = useSelector(state => state.types);
    //------------------FILTROS
    const[typeSelect, setTypeSelect] = useState()
    const [selectFrom, setSelectFrom] = useState('TODOS')
    //---------------------BUSQUEDA
    
    const suggestion = useSelector(state => state.allPokemons.map(e => e.name))
    const [searchPokemon, setSearchPokemon ] = useState()
    console.log(searchPokemon, typeof searchPokemon)
   
    //-------------------------PAGINADO---------------
    
    const {page, min, max} = useSelector(state => state.pagination)
    const [pagination, setPagination] = useState([ ...pokemon.slice(min,max)])

    useEffect(()=>{

        setPagination([...pokemon.slice(min,max || pokemon.length)])

    },[dispatch,min,max,pokemon,searchPokemon])
    //------------------------------------------------




    const next = (e)=>{
        console.log(page, min, max)
        if(page < Math.ceil(pokemon.length / 12)){
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
        const order = e.target.value;

        if(order === 'A_Z'){
            dispatch(actions.orderA_Z());
        }else{
            dispatch(actions.orderZ_A())
        }
        e.target.value = 'default';
        
    }
    const db = (e)=>{
        clearStateNamePokemon();
        let bool = true;
        setTypeSelect('default')
        setSelectFrom('DB')
        dispatch(actions.dbPokemons(bool))
        // trae los pokemons de la base
    }
    
    const api = (e)=>{
        clearStateNamePokemon();
        setTypeSelect('default')
        setSelectFrom('API')
        dispatch(actions.pokemonsApi())
    }
    const allPokemons= (e)=>{
        clearStateNamePokemon();
        setTypeSelect('default')
        setSelectFrom('TODOS')
        dispatch(actions.reloadPokemon())
    }
    const typePokemon = (e)=>{
        const typeAction = {
            from: selectFrom,
            type: e.target.value,
            
        }
        console.log(typeAction)
        setTypeSelect(e.target.value)
        
        if(typeAction){
            //dispatch(actions.reloadPokemon());
            dispatch(actions.pokemonType(typeAction))
        }
        e.target.value= "default"
    }
    const clearStateNamePokemon = () => {
        dispatch(actions.clearPokemons())
    }
 //-----------------------------SearchBarEvent  
    const search = (e)=>{
        setSelectFrom('SEARCH')
        let namePokemon = document.getElementById('namePokemon');
        if(namePokemon.value){
            
            dispatch(actions.fetchPokemonsByName(namePokemon.value))
            namePokemon.value = ""
            setSearchPokemon()
        }
    }
    const searchAutocomplete = (e)=>{
        setSearchPokemon(e.target.value)
        //if(searchPokemon) setSearchPokemon()
    }
    const selectPokemonSuggestion = (e)=>{
        setSelectFrom('SEARCH')
        dispatch(actions.fetchPokemonsByName(e.target.value)) 
        let inputClear = document.getElementById('namePokemon');
        inputClear.value = ""
        setSearchPokemon()
        
    }

    return(
        <main>
            <button className={styles.buttonBack} onClick={(e) => {
                    e.preventDefault()
                    history.push('/')
                }}>◄ Inicio</button>
            <section className={styles.nav}>

                <article className={styles.options}>
                    <div>
                        <span>Search </span>
                        <input className={styles.searchInput} id="namePokemon" type={'text'} name={'nombre'} placeholder={'Buscar'} autoComplete={'off'} onChange={searchAutocomplete}/>
                        <button className={styles.searchButton} onClick={search}>Buscar &#128270; </button>
                    </div>

                    <div>
                        { 
                                document.getElementById('namePokemon')?.value  ?  <>
                                                    {   // posible cambio a listas
                                                    suggestion?.find(e=> e.startsWith(searchPokemon) && e.length !== searchPokemon.length) ? <li>

                                                        {
                                                            searchPokemon ? suggestion?.map((e, index)=>{
                                                                return e.startsWith(searchPokemon) && e.length !== searchPokemon.length ? <ul key={index}  ><button value={e} onClick={selectPokemonSuggestion} >{e}</button></ul> : <></>
                                                            }) : <></>
                                                        }

                                                    </li> : <></>
                                                        
                                                    }   
                                            </>  : <></>
                        }
                    </div>
                </article>
                <article className={styles.options}>
                    
                    <span>order </span>
                    <button onClick={highAttack}>↑Ataque</button>
                    <button onClick={lowAttack}>↓Ataque</button>
                    <select name="Alfaoption" required={true} onChange={alfaOrder}>
                        <option value={'default'}>Elegir</option>
                        <option value={'A_Z'}>A_Z</option>
                        <option value={'Z_A'}>Z_A</option>
                    </select>

                </article>
                <article className={styles.options}>
                    <span>filters </span>
                    <select id="types" name="types" onChange={typePokemon}>
                        <option value={'default'}>Seleccione un Tipo</option>
                        {
                            types.map((e, index)=> <option key={index} value={e.name}>{e.name}</option> )
                        }
                    </select>
                    <div>
                        <button onClick={allPokemons}>All Pokemons</button>
                        <button onClick={db}>DB</button>
                        <button onClick={api}>API</button>
                    </div>
                    
                </article>
                <article className={styles.options}>
                    <span>Crear </span>
                    <Link to={'/Post'}><button>Crear</button></Link>
                </article>
            </section>
            <section>
                <div>
                    {
                        typeSelect !== 'default' ? <span><h3 style={{display: 'inline'}}>{typeSelect}</h3></span> : <></>
                    }
                    {
                        selectFrom ? <span><h3 style={{display: 'inline'}}>{selectFrom}</h3></span> : <></>
                    }
                    
                </div>
            </section>
            <section>
                
                {
                   pokemonName.length === 0  ?  pagination.map((e,index)=><button key={index}>
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
                    :  <p>LOADING..</p>
                }
                <button onClick={prev}>◄ Anterior</button>
                <button onClick={next}>Siguiente ►</button>
                
                
            </section>
        </main>
    )


}
