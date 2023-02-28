

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import style from '../Style/Post.module.css'

import * as actions from '../redux/actions';

//Reparar 
function validation(value, name, error, setError){

  
        if(name === 'image' && !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value) ){

            return  setError({
                ...error,
                image: 'El Texto no es una URL.'
            })
        }     
        if( (name === 'name' && / /.test(value)) || (name === 'name' && value.length > 12)){

            return setError({
                ...error,
                name: 'El Nombre contiene espacios intermedios o contiene mas de 12 caracteres.'
            })
        }
 
        if (name === 'height' && (value < 1 || value > 20) ){

            return setError({
                ...error,
                height: 'La Altura se exede de los limites 1 y 20.'
            })
        }
        if(name === 'weight' && (Number(value) < 10 || Number(value)  > 80) ){

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
    
    let setsValidation = (set, value, name) =>{
    
        if(set.size >= 3 && name === 'type'){
            return setError({
                ...error,
                type: "Limite maximo de 3 tipos"
            })
        }else if(set.size >= 7 && name === 'move'){
            return setError({
                ...error,
                move: "Limite maximo de 7 movimientos"
            })
        }
        setError({})
        set.add(value)
        return set
    }

    
    const handleChange =(e)=>{
        
        e.preventDefault();
    
        setForm({
            ...form,
            [e.target.name]: e.target.name === 'type' ? setsValidation(form.type,e.target.value, e.target.name)|| form.type :  e.target.name === 'move' ? setsValidation(form.move,e.target.value, e.target.name) || form.move  : validation(e.target.value, e.target.name, error, setError) ,
        })

        if(e.target.name === 'move'){

            setMoveSelect([...form.move].map((e) => {

                return{
                    id: e,
                    move: moves[e-1].move
                }
            }))
        } 
        if(e.target.name === 'type' && form.type.size <=5){

            setTypes([...types.filter(e=> !form.type.has(`${e.id}`) )])
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
            setError({
                ...error,
                move: ''
            })
            setMoveSelect([...form.move].map((e) => {

                return{
                    id: e,
                    move: moves[e-1].move,
                }
            }))
        }else{

            setTypes([...allTypes.filter(e=> !form.type.has(`${e.id}`) )])
            setError({
                ...error,
                type: ''
            })
            setTypeSelect(typeSelect.filter(e=> e.id !== value))
        }
        
    }

    const handleSubmit = (event)=>{
       
        event.preventDefault()
        if(Object.keys(error).length !== 0) return alert("Faltan datos por completar") 
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
    //console.log(form.type, form.move)
    //console.log(form)
    //console.log(moveSelect)
    //console.log(typeSelect)
    //console.log(error)
    
    return (
        <div className={style.containerForm} >
        <button onClick={back}>Volver</button>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.containerInputOne}>

                    <span>
                        <label className={style.labelInput}>Nombre</label>
                        <input type={'text'} name={'name'}  onChange={handleChange}/>
                        {error.name && <p className={style.errorSpan}>{error.name}</p>  }
                    </span>

                    <span>
                        <label className={style.labelInput}>Imagen</label>
                        <input type={'url'} name={'image'}  onChange={handleChange}/>
                        <img className={style.urlImage} src={`${form.image}`} height='60px' width={'60px'} alt={'Imagen aportada'}></img>
                        {error.image && <p className={style.errorSpan}>{error.image}</p>}
                    </span>
                </div>
                    <hr/>
                <div className={style.containerInputTwo}>
                    <span>
                        <label className={style.labelInput}>Altura</label>
                        <input type={'range'} name={'height'}  step={0.1} defaultValue={1} onChange={handleChange}/>
                        <output>{form.height}</output>
                        {error.height && <p className={style.errorSpan}>{error.height}</p>}
                    </span>
                    <span>
                        <label className={style.labelInput}>Peso</label>
                        <input type={'range'} name={'weight'}  step={0.1} defaultValue={1} onChange={handleChange}/>
                        <output>{form.weight}</output>
                        {error.weight && <p className={style.errorSpan}>{error.weight}</p>}
                    </span>
                    <span>
                        <label className={style.labelInput}>Puntos de vida</label>
                        <input type={'range'} name={'hp'}  step={1} defaultValue={1} onChange={handleChange}/>
                        <output>{form.hp}</output>
                        {error.hp && <p className={style.errorSpan}>{error.hp}</p>}
                    </span>
                    <span>
                        <label className={style.labelInput}>Ataque</label>
                        <input type={'range'} name={'attack'}  step={1} defaultValue={1} onChange={handleChange}/>
                        <output>{form.attack}</output>
                        {error.attack && <p className={style.errorSpan}>{error.attack}</p>}
                    </span>
                    <span>
                        <label className={style.labelInput}>Defensa</label>
                        <input type={'range'} name={'defense'}step={1} defaultValue={1} onChange={handleChange}/>
                        <output>{form.defense}</output>
                        {error.defense && <p className={style.errorSpan}>{error.defense}</p>}
                    </span>
                    <span>
                        <label className={style.labelInput} >Velocidad</label>
                        <input type={'range'} name={'speed'}  step={1} defaultValue={1} onChange={handleChange} />
                        {error.speed && <p className={style.errorSpan}>{error.speed}</p>}
                    </span>
                </div>
                <hr/>
                <div className={style.typesSelected}>
                    <span className={style.labelSpecial}> id de los Tipos Selecionados</span>
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
                </div>
                {error.type && <p className={style.errorSpan}>{error.type}</p>}
                <hr/>
                <div className={style.selectedOfTypes}>
                    {   
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
                </div>
                <hr/>
                <span className={style.labelInput}>Movimientos</span>
                <div className={style.movesSelected}>
                    {
                        moveSelect.map(e=>{
                            return(
                                <span key={e.id}>{e.move}
                                    <button name='move' value={e.id} onClick={deleteSelected}>X</button>
                                </span>
                            )
                        })
                    }
                </div>
                {error.move && <p className={style.errorSpan}>{error.move}</p>}
                <hr/>
                <div className={style.selectedOfMoves}>
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
                </div>
                <input type={'submit'} value={'Crear'}/>

            </form>
        </div>
    )

}