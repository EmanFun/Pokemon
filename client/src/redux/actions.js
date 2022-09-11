import axios from 'axios';



export function allPokemons(payload){
    return {
        type: 'ALL_POKEMONS',
        payload
    }
};


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
