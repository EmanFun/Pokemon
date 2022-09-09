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
        case 'POKEMONS_API':
            return{
                state,
                pokemons: state.pokemons.filter(e => e.id > 0)
            }
        case 'POKEMONS_TYPE':
            return{
                ...state,
                pokemons: state.pokemons.filter(e => e.types.includes(action.payload) || e.types.forEach(element => {
                    if(element.name === action.payload) return true
                }))
            }
        case 'H_ATTACK':
            return {
                ...state,
                pokemons: state.pokemons.sort((a,b) => b.attack - a.attack )
            }
        case 'L_ATTCAK':
            return{
                ...state,
                pokemons: state.pokemons.sort((a,b) => a.attack - b.attack)
            }
        default: 
            return {...state}        
    }
}