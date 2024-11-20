import React from 'react'
import { useState } from 'react'

const Registro = ()=>{

    const registrarPersona = async () => {

    }

    return <>
        <h2>Registro Persona</h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Ingrese su información: </div>
                <br></br>
                <div className="card-content"> 
                    <div className="column">
                        <div className="row">
                            Cuenta Metamask:
                            <p>x0dsiofj</p>
                        </div>
                        <br></br>
                        <div className="row">
                            Nombre:
                            <input></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Documento:
                            <input></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Fecha de nacimiento (dd/mm/aaaa):
                            <input></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Fecha de expedición de la cédula (dd/mm/aaaa):
                            <input></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Celular:
                            <input></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Correo electrónico:
                            <input></input>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <button onClick={registrarPersona}>Enviar</button>
                </div>
            </div>
        </div>
    </>
}
export default Registro;