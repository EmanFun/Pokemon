

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import * as actions from '../redux/actions';

//Reparar 
function validation(value, name, error, setError){
    console.log(value)
  
        if(name === 'image' && !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value) ){
            console.log('entro url')
            return  setError({
                ...error,
                image: 'El Texto no es una URL.'
            })
        }     
        if( (name === 'name' && / /.test(value)) || (name === 'name' && value.length > 12)){
            console.log('entro name')
            return setError({
                ...error,
                name: 'El Nombre contiene espacios intermedios o contiene mas de 12 caracteres.'
            })
        }
 
        if (name === 'height' && (value < 1 || value > 20) ){
            console.log('entro altura')
            return setError({
                ...error,
                height: 'La Altura se exede de los limites 1 y 20.'
            })
        }
        if(name === 'weight' && (Number(value) < 10 || Number(value)  > 80) ){
            console.log('entro peso')
            return setError({
                ...error,
                weight: 'El Peso se exede de los limites 10 y 80.'
            })
        }
        if(name === 'hp'&& (value < 10 || value > 50)){
            return setError({
                ...error,
                hp: 'Los Puntos de vida exeden los limites 10 y 50.'
            })
        }
        if(name === 'attack' && (value < 10 || value > 90)){
            return setError({
                error,
                attack: 'El Ataque exede los limites 10 y 90.'
            })
        }
        if(name === 'defense' && (value < 10 || value > 80)){
            return setError({
                ...error,
                defense: 'La Defensa exede los limites 10 y 80.'
            })
        }
        if(name === 'speed' && (value < 10 || value > 80)){
            return setError({
                ...error,
                speed: 'La Velocidad exede los limites 10 y 80.'
            })
        }
        setError({})
        return value
    
    

}


export default function Post(){
    
    const allTypes = useSelector(state=> state.types)
    let [types, setTypes ]= useState([...allTypes]);
    const moves = useSelector(state=> state.moves.sort((a, b)=> a.id - b.id));
    
    
    const history = useHistory();
    const dispatch = useDispatch();



    const [form, setForm] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        type: new Set(),
        move: new Set()
    })
    const [typeSelect, setTypeSelect] = useState([])

    const [moveSelect , setMoveSelect] = useState([])

    const [error, setError] = useState({})

    useEffect(()=>{

       

        return ()=>{
            dispatch(actions.fetchPokemons())
        }
        
    },[dispatch])
    
    
    const handleChange =(e)=>{

        e.preventDefault();
    
        setForm({
            ...form,
            [e.target.name]: e.target.name === 'type' ? form.type.add(e.target.value):  e.target.name === 'move' ? form.move.add(e.target.value) : validation(e.target.value, e.target.name, error, setError) ,
        })

        if(e.target.name === 'move'){

            setMoveSelect([...form.move].map((e) => {

                return{
                    id: e,
                    move: moves[e-1].move
                }
            }))

        } 

        if(e.target.name === 'type'){

            setTypes([...types.filter(e=> !form.type.has(`${e.id}`) )])
            //console.log(types)
            setTypeSelect([...form.type].map(e => {
                return{
                    id: e,
                    type: allTypes[e-1].name
                }
            }))
        }

    }
    
    const deleteSelected = (e)=>{
        e.preventDefault()
        
        const value = e.target.value
        form[e.target.name].delete(value)
        if(e.target.name === 'move'){
            setMoveSelect([...form.move].map((e) => {

                return{
                    id: e,
                    move: moves[e-1].move,
                    type: moves[e-1].ofType
                }
            }))
        }
        setTypes([...allTypes.filter(e=> !form.type.has(`${e.id}`) )])
        setTypeSelect(typeSelect.filter(e=> e.id !== value))
        
    }

    const handleSubmit = (event)=>{
       
        event.preventDefault()
        let data = {
            ...form,
            type: Array.from(form.type),
            move: Array.from(form.move)
        }
        dispatch(actions.postPokemon(data,history))
        setForm({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            image: '',
            move: new Set(),
            type: new Set()
        })
        console.log(data)
    }
    
    const back = (e)=>{
        e.preventDefault();
        history.push('/Main');
        
    }
    console.log(form.type, form.move)
    //console.log(moves)
    console.log(moveSelect)
    //console.log(typeSelect)
    
    return (
        <div>
        <button onClick={back}>Volver</button>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Nombre</label>
                    <input type={'text'} name={'name'}  onChange={handleChange}/>
                    {error.name && <p>{error.name}</p>  }
                </p>

                <p>
                    <label>Imagen</label>
                    <input type={'url'} name={'image'}  onChange={handleChange}/>
                    <img src={`${form.image}`} height='60px' width={'60px'} alt={'Imagen aportada'}></img>
                    {error.image && <p>{error.image}</p>}
                </p>
                <p>
                    <label>Altura</label>
                    <input type={'range'} name={'height'}  step={0.1} defaultValue={1} onChange={handleChange}/>
                    <output>{form.height}</output>
                    {error.height && <p>{error.height}</p>}
                </p>
                <p>
                    <label>Peso</label>
                    <input type={'range'} name={'weight'}  step={0.1} defaultValue={1} onChange={handleChange}/>
                    <output>{form.weight}</output>
                    {error.weight && <p>{error.weight}</p>}
                </p>
                <p>
                    <label>Puntos de vida</label>
                    <input type={'range'} name={'hp'}  step={1} defaultValue={1} onChange={handleChange}/>
                    <output>{form.hp}</output>
                    {error.hp && <p>{error.hp}</p>}
                </p>
                <p>
                    <label>Ataque</label>
                    <input type={'range'} name={'attack'}  step={1} defaultValue={1} onChange={handleChange}/>
                    <output>{form.attack}</output>
                    {error.attack && <p>{error.attack}</p>}
                </p>
                <p>
                    <label>Defensa</label>
                    <input type={'range'} name={'defense'}step={1} defaultValue={1} onChange={handleChange}/>
                    <output>{form.defense}</output>
                    {error.defense && <p>{error.defense}</p>}
                </p>
                <p>
                    <label >Velocidad</label>
                    <input type={'range'} name={'speed'}  step={1} defaultValue={1} onChange={handleChange} />
                    {/*{error.speed && <p>{error.speed}</p>}*/}
                </p>
                
                <hr/>
                <p> id de los Tipos Selecionados</p>
                <>{
                    typeSelect.length?  typeSelect.map((e,index)=> {
                        return (
                            <div key={index}>
                            <label key={index} >{e.type}, </label>
                            <button name="type" value={e.id} onClick={deleteSelected} >X</button>
                            </div>
                        )
                        }) : <p>Ninguno</p>
                    } 
                </>
                <hr/>
                <>
                    {   // al selecionar el tipo renderizaria sus movimientos correspondientes para podes ser seleccionados, debe tener un maximo de movimientos en total
                        // seran asociados correspondientemente con el pokemon en la ruta post 
                        types.length ? types.map((e, index)=> {
                            return  (<>
                                <span key={index}> 
                                <button  name='type' value={e.id} onClick={handleChange}>{e.name} </button>
                                </span>
                                <br/>
                                </>
                                )}) : <></>
                    }
                </>
                <hr/>
                <p>Movimientos</p>
                {
                    moveSelect.map(e=>{
                        return(
                            <span key={e.id}>{e.move}
                                <button name='move' value={e.id} onClick={deleteSelected}>X</button>
                            </span>
                        )
                    })
                }
                <hr/>
                {
                    moves.filter(b =>{
            
                        let match = false
            
                        typeSelect.forEach(e => {

                             if(e.type === b.ofType && !form.move.has(`${b.id}`)){
                                match = true
                             }
                        })
                        return match
                    }).map(e=>{
                        return (
                            <div key={e.id}>
                                <span>
                                    <button name='move' value={e.id} onClick={handleChange}>{e.move}</button>
                                </span>
                            </div>
                        )
                    })
                }

                <input type={'submit'} value={'Crear'}/>

            </form>
        </div>
    )

}