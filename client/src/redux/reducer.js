

const initialState = {
    allPokemons: [],
    pokemons: [],

    pokemonById: undefined,
    pokemonByName: [],
    types: [],
    response: '',
    pagination:{
        min: 0,
        max: 12,
        page: 1, 
    } 

}


export default function rootReducer(state = initialState, action ){

    switch(action.type){

        case 'POST_RESPONSE':
            return{
                ...state,
                response: action.payload,
            }

        case 'RELOAD_POKEMON':
            return{
                ...state,
                pokemons : [...state.allPokemons],
            }
        case 'POKEMON_DB':
            return{
                ...state,
                pokemons: action.payload
            }
        case 'ALL_POKEMONS':
            return {
                ...state,
                allPokemons: action.payload
            }
        case 'CLEAR_POKEMONS':
            return{
                ...state,
                pokemons: [],
                pokemonByName: []
                

            }
        case 'ID_POKEMON':
            return{
                ...state,
                pokemonById: action.payload
            }
        case 'CLEAR_POKEMON_ID':
            return{
                ...state,
                pokemonById: action.payload,
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
        case 'CLEAR_POKEMON_NAME':
            return{
                ...state,
                pokemonByName: action.payload
            }
        case 'POKEMONS_API':
            return{
                ...state,
                pokemons: state.allPokemons.filter(e => e.id > 0)
            }
        case 'POKEMONS_TYPE':
            return{
                ...state,
                pokemons: action.payload.from === 'TODOS'? state.allPokemons.filter(e => e.types.includes(action.payload.type)) : 
                action.payload.from === 'API' ? state.allPokemons.filter(e => e.types.includes(action.payload.type)) :
                state.allPokemons.filter(obj => obj.types.some(e=> e.name === action.payload.type) && (typeof obj.id === 'string') )
            }
        //ordenamiento por Ataque
        case 'H_ATTACK':
            return {
                ...state, 
                pokemons: [...state.pokemons.sort((a,b) => b.attack - a.attack )]
            }
        case 'L_ATTACK':
            return{
                ...state,
                pokemons: [...state.pokemons.sort((a,b) => a.attack - b.attack)]
            }
        //ordenamiento Alfabetico   
        case 'A_Z':
            return{
                ...state,
                pokemons: [...state.pokemons.sort((a, b)=> a.name.localeCompare(b.name) )]
            }
        case 'Z_A':
            return{
                ...state,
                pokemons: [...state.pokemons.sort((a, b)=> b.name.localeCompare(a.name) )]
            }
        //Paginado
        case 'NEXT_PAG':
            return{
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page + 1,
                    min:   state.pagination.min + 12,
                    max:  state.pagination.max + 12,         
                }
                

            }
        case 'PREV_PAG':
            return{
                ...state,
                pagination:{
                    ...state.pagination,
                    page: state.pagination.page - 1,      
                    min:  state.pagination.min - 12,
                    max:  state.pagination.max - 12  ,
                }
                
                    
            }
        default: 
            return {...state}        
    }
}