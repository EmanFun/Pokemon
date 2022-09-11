import React from "react";
import { useSelector } from "react-redux";

import {Link} from 'react-router-dom';

import Card from "./Card";







export default function Main(){

    const pokemon = useSelector(state=> state.pokemons);
    
    
    
    





    

    return(
        <main>
            <section>
                <div>
                <input/>
                <button>Buscar</button>
                </div>
                <div>
                    <p>order</p>
                </div>
                <div>
                    <p>filters</p>
                </div>
                <div>
                    <p>Crear</p>
                    <Link to={'/Post'}><button>Crear</button></Link>
                </div>
            </section>
            <section>
                
                {
                    pokemon.map((e,index)=><button key={index}>
                        <Link to={`/Detail/${e.id}`}>
                            <Card 
                            id={e.id} 
                            name={e.name} 
                            types={e.types} 
                            attack={e.attack} 
                            image={e.image} 
                            ></Card>
                            </Link>
                        
                        </button>)
                    
                }

                
                
            </section>
        </main>
    )


}
