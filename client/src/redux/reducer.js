const initialState = {
    pokemons: [],
    pokemonById: [],
    pokemonByName: [],
    types: [],


};



export default function rootReducer(state = initialState, action ){

    switch(action.type){
        case 'ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'ID_POKEMON':
            return{
                ...state,
                pokemonById: action.payload
            }
        case 'ALL_TYPE':
            return{
                ...state,
                types: action.payload
            }
        case 'NAME_POKEMON':
            return {
                ...state,
                pokemonByName: action.payload
            }
        

        default: 
            return {...state}        
    }
}