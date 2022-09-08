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



