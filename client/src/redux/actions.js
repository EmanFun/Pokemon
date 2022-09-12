import axios from 'axios';



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
            .then(data => dispatch(allPokemons(data)))
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
// un ordeanmiento desde el back
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
