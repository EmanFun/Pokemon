import { allPokemons } from "./actions"

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
                pokemons: []
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
                pokemons: state.pokemons.filter(e => e.types.includes(action.payload) || e.types.forEach(element => {
                  if(element.name === action.payload) return element
                }))
            }
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
        case 'ALFA':
            return{
                ...state,
                pokemons: action.payload,
            }   
    
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