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
        dispatch(actions.pagReset()) // resetea el paginado
    }
    
    const api = (e)=>{
        clearStateNamePokemon();
        setTypeSelect('default')
        setSelectFrom('API')
        dispatch(actions.pokemonsApi())
        dispatch(actions.pagReset())
        
    }
    const allPokemons= (e)=>{
        clearStateNamePokemon();
        setTypeSelect('default')
        setSelectFrom('TODOS')
        dispatch(actions.reloadPokemon())
        dispatch(actions.pagReset())
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
            dispatch(actions.pagReset())
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
        <main className={styles.containerMain}>
            <button className={styles.buttonBack} onClick={(e) => {
                    e.preventDefault()
                    history.push('/')
                }}>◄ Inicio</button>
            <section className={styles.nav}>

                <article className={styles.options}>

                <div className={styles.searchContainer}>
                        <input className={styles.searchInput} id="namePokemon" type={'text'} name={'nombre'} placeholder={'Buscar'} autoComplete={'off'} onChange={searchAutocomplete}/>
                        <button className={styles.searchButton} onClick={search}>Buscar &#128270; </button>

                    <div >
                        { 
                                document.getElementById('namePokemon')?.value  ?  <>
                                                    {   // posible cambio a listas
                                                    suggestion?.find(e=> e.startsWith(searchPokemon) && e.length !== searchPokemon.length) ? <ul className={styles.suggestion}>

                                                        {
                                                            searchPokemon ? suggestion?.map((e, index)=>{
                                                                return e.startsWith(searchPokemon) && e.length !== searchPokemon.length ? <li   key={index}  ><button className={styles.suggestionButton} value={e} onClick={selectPokemonSuggestion} >{e}</button></li> : <></>
                                                            }) : <></>
                                                        }

                                                    </ul> : <></>
                                                        
                                                    }   
                                            </>  : <></>
                        }
                    </div>
                </div>
                </article>
                <article className={styles.options}>
                    
                    <button className={styles.orderButton} onClick={highAttack}>↑Ataque</button>
                    <button className={styles.orderButton} onClick={lowAttack}>↓Ataque</button>
                    <select className={styles.selectAlfaOrder} name="Alfaoption" required={true} onChange={alfaOrder}>
                        <option  value={'default'}>Elegir</option>
                        <option  value={'A_Z'}>A_Z</option>
                        <option  value={'Z_A'}>Z_A</option>
                    </select>

                </article>
                <article className={styles.options}>

                    <select className={styles.selectFilters} id="types" name="types" onChange={typePokemon}>
                        <option  value={'default'}>Seleccione un Tipo</option>
                        {
                            types.map((e, index)=> <option  key={index} value={e.name}>{e.name}</option> )
                        }
                    </select>
                    <div>
                        <button className={styles.filtersButtons} onClick={allPokemons}> All Pokemons </button>
                        <button className={styles.filtersButtons} onClick={db}> DB </button>
                        <button className={styles.filtersButtons} onClick={api}> API </button>
                    </div>
                    
                </article>
                <article className={styles.options}>
                    <Link to={'/Post'}><button className={styles.createButton}>Crear</button></Link>
                </article>
            </section >
            <section className={styles.baseSelected}>
                <div>
                    {
                        typeSelect !== 'default' ? <span className={styles.typeSpanSelected} ><h3 style={{display: 'inline'}}>{typeSelect}</h3></span> : <></>
                    }
                    {
                        selectFrom ? <span><h3 style={{display: 'inline'}}>{selectFrom}</h3></span> : <></>
                    }
                    
                </div>
            </section>
            <section className={styles.pagination}>
                
                {
                   pokemonName.length === 0  ?  pagination.map((e,index)=><button className={styles.buttonCard} key={index}>
                        <Link className={styles.link} to={`/Detail/${e.id}`}>
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
                        <button className={styles.buttonCard}>
                            <Link className={styles.link} to={`/Detail/${pokemonName.id}`}>
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
                
                
            </section>
            <section className={styles.containerPrev_Next}>
                <button className={styles.buttonPrev_Next} onClick={prev}>◄ Anterior</button>
                <button className={styles.buttonPrev_Next} onClick={next}>Siguiente ►</button>
            </section>
        </main>
    )


}
