import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actions from '../redux/actions';

//Reparar 
function validation(value, name, error, setError){

    if(!value.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/) && name === 'url'){
        setError({
            ...error,
            url: 'el texto no es una url',
        })
    }else{
        setError({
            ...error
        })
    }     
    if(value.match(/ / && name === name)){
        setError({
            name: 'El nombre contiene espacios intermedios'
        })
    }else{
        setError({
            ...error,
        })
    }

    if (!value > 0.0 && !value < 20 && name === 'height'){
        setError({
            ...error,
            height: 'La altura se exede de los limites 0 y 20'
        })
    }else{
        setError({
            ...error
        })
    }
    if(!value > 0.0 && !value <80 && name === 'weight'){
        setError({
            ...error,
            weight: 'El peso se exede de los limites 0 y 100'
        })
    }else{
        setError({
            ...error
        })
    }
    if(!value > 0 && !value < 100 ){
        setError({
            ...error,
            [name]: `La/El ${name} se exede de los limites 0 y 100`,
        })
    }
    return value

}


export default function Post(){

    const types = useSelector(state=> state.types);
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
        type: new Set()
    })
    const [typeSelect, setTypeSelect] = useState([...form.type])

    const [error, setError] = useState({})

    useEffect(()=>{
        
    },[])
    const handleChange =(e)=>{

        e.preventDefault();
    
        setForm({
            ...form,
            [e.target.name]: e.target.name === 'type' ? form.type.add(e.target.value): validation(e.target.value, e.target.name, error, setError) ,
        })
        setTypeSelect([...form.type])
    }
    const deleteType = (e)=>{
        e.preventDefault()
        console.log(e.target.value)
        const value = e.target.value
        form.type.delete(value)
        console.log(form.type)
        setTypeSelect(typeSelect.filter(e=> e !== value))
    }

    const handleSubmit = (event)=>{
       
        event.preventDefault()
        let data = {...form}
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
            type: new Set()
        })

    }
    const back = (e)=>{
        e.preventDefault();
        history.push('/Main');
        
    }
    console.log(form)
    console.log(typeof form.type)
    console.log(typeSelect)
    console.log(error)
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
                {error.url && <p>{error.url}</p>}
                </p>
                <p>
                <label>Altura</label>
                <input type={'range'} name={'height'} min={-10}  step={0.1} defaultValue={1} onChange={handleChange}/>
                <output>{form.height}</output>
                {error.height && <p>{error.height}</p>}
                </p>
                <p>
                <label>Peso</label>
                <input type={'range'} name={'weight'} min={-10} max={120} step={0.1} defaultValue={1} onChange={handleChange}/>
                <output>{form.weight}</output>
                {error.weight && <p>{error.weight}</p>}
                </p>
                <p>
                <label>Puntos de vida</label>
                <input type={'range'} name={'hp'} min={-10} max={120} step={1} defaultValue={1} onChange={handleChange}/>
                <output>{form.hp}</output>
                {error.hp && <p>{error.hp}</p>}
                </p>
                <p>
                <label>Ataque</label>
                <input type={'range'} name={'attack'} min={-10} max={120} step={1} defaultValue={1} onChange={handleChange}/>
                <output>{form.attack}</output>
                {error.attack && <p>{error.attack}</p>}
                </p>
                <p>
                <label>Defensa</label>
                <input type={'range'} name={'defense'} min={-10} max={120} step={1} defaultValue={1} onChange={handleChange}/>
                <output>{form.defense}</output>
                {error.defense && <p>{error.defense}</p>}
                </p>
                <p>
                <label >Velocidad</label>
                <input type={'range'} name={'speed'} min={-10} max={120} step={1} defaultValue={1} onChange={handleChange} />
                <output id="outspeed"  >{form.speed}</output>
                {error.speed && <p>{error.speed}</p>}
                </p>
                <hr/>
                <p> id de los Tipos Selecionados</p>
                <>{typeSelect.length?  typeSelect.map((e,index)=> {
                    return (
                        <div key={index}>
                        <label key={index} >{e}, </label>
                        <button value={e} onClick={deleteType} >X</button>
                        </div>
                    )
                    }) : <p>Ninguno</p>} </>
                
                <hr/>
                {
                    types.map((e, index)=> {
                        return (
                            <span key={e.id}> {e.name}
                            <input key={index} name='type' type={'radio'} value={e.id} onChange={handleChange}/>
                            </span>
                            )})
                }
                <hr/>
                <input type={'submit'} value={'Crear'}/>

            </form>
        </div>
    )

}