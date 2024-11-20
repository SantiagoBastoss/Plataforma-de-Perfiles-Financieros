import React from 'react'
import { useState } from 'react'

const InfoPersonal = ()=>{

    const registrarPersona = async () => {

        if(loggedIn){
            changeLoggedTrue();
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }

    return <>
        <h2>Información Personal </h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Nombre </div>
                <br></br>
                <div className="card-content"> 
                    Nombre Prueba
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Número de documento </div>
                <br></br>
                <div className="card-content"> 
                    321039201
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Fecha de Nacimiento </div>
                <br></br>
                <div className="card-content"> 
                    10/10/2003
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Fecha de Expedición de la cédula </div>
                <br></br>
                <div className="card-content"> 
                    10/10/2021
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Celular </div>
                <br></br>
                <div className="card-content"> 
                    3201853772
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Correo electrónico </div>
                <br></br>
                <div className="card-content"> 
                    prueba@gmail.com
                </div>
            </div>
        </div>
    </>
}
export default InfoPersonal;