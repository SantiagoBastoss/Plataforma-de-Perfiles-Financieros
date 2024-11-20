import React from 'react'
import { useState } from 'react'

const ProdsFinancieros = ()=>{

    const registrarPersona = async () => {

        if(loggedIn){
            changeLoggedTrue();
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }

    return <>
        <h2>Productos Financieros</h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Escriba el NIT de su entidad:
                        <input></input>
                    </div>
                    <br></br>
                    <button>Consultar</button>
                </div>
            </div>
        </div>
    </>
}
export default ProdsFinancieros;