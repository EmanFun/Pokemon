import axios from 'axios';



export function reloadPokemon(){
    return{
        type:'RELOAD_POKEMON',
    }
}

export function pokemonsDB(payload){
    return{
        type:'POKEMON_DB',
        payload
    }
}


export function allPokemons(payload){
    return {
        type: 'ALL_POKEMONS',
        payload
    }
};

export function clearPokemons(){
    return{
        type: 'CLEAR_POKEMONS',
    }

}


export function idPokemon(payload){
    return {
        type: 'ID_POKEMON',
        payload
    }
}


export function types(payload){
    return {
        type: 'ALL_TYPE',
        payload
    }
}

export function namePokemon(payload){
    return{
        type: 'NAME_POKEMON',
        payload,
    }
}

export function clearId(payload){
    return {
        type: 'CLEAR_POKEMON_ID',
        payload
    }
}

export function clearName(payload){
    return{
        type: 'CLEAR_POKEMON_NAME',
        payload
    }
}

export function alfa(payload){
    return{
        type: 'ALFA',
        payload
    }
}

export function response(payload){
    return{
            type: 'POST_RESPONSE',
            payload,
        }
}

//----------------------PETICIONES AXIOS----------------------------

export function fetchPokemons(){
    return function(dispatch){
        axios.get('http://localhost:3001/pokemons')
            .then(response => response.data)
            .then(data => dispatch(allPokemons(data)))
            .catch(e => console.error(e));
    }
}

export function fetchTypes(){
    return function(dispatch){
        axios.get('http://localhost:3001/types')
            .then(r=> r.data)
            .then(data => dispatch(types(data)))
            .catch(err=> console.error(err));
    }
}

export function fetchPokemonsByName(name){
    return function(dispatch){
        axios.get(`http://localhost:3001/pokemons?name=${name}`)
            .then(r=> r.data)
            .then(data => dispatch(namePokemon(data)))
            .catch(e=> console.error(e));
    }
}
export function alfaOrder(order){
    return function (dispatch){
        axios.get(`http://localhost:3001/pokemons?alfa=${order}`)
            .then(r=> r.data)
            .then(data => dispatch(alfa(data)))
            .catch(e=> console.error(e));
    }
}
export function dbPokemons(bool){
    return function (dispatch){
        axios.get(`http://localhost:3001/pokemons?created=${bool}`)
            .then(r=> r.data)
            .then(data => dispatch(pokemonsDB(data)))
            .catch(e=>console.error(e));
    }
}

export function postPokemon(post, history){
    return function (dispatch){
        axios.post('http://localhost:3001/postPokemons',post)
            .then(r=> r.data)
            .then(payload=>{
                alert(payload)
                dispatch(response(payload))
                history.push('/Main')
            })
            .catch(e=> console.error(e));
    }
}

//------------------PAgination-------------------}


export function next(){
    return{
        type:'NEXT_PAG'
    }
}
export function prev(){
    return{
        type:'PREV_PAG'
    }
}



//-------------------------orderanados---------------
// por Ataque
export function highAttack(){
    return{
        type:'H_ATTACK'
    }

}

export function lowAttack(){
    return {
        type: 'L_ATTACK'
    }
}
//alfabetico

export function orderA_Z(){
    return{
        type: 'A_Z'
    }
}

export function orderZ_A(){
    return{
        type: 'Z_A'
    }
}


//-------------------------filtrados---------------
//un filtrado desde el back

export function pokemonsApi(){
    return{
        type: 'POKEMONS_API'
    }
}

export function pokemonType(payload){
    return {
        type:'POKEMONS_TYPE',
        payload
    }
}
