import React from 'react'
import { useState } from 'react'

const HistReportes = ()=>{

    const registrarPersona = async () => {

        if(loggedIn){
            changeLoggedTrue();
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }

    return <>
        <h2>Historial de Reportes</h2>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad: Bancolombia </div>
                <br></br>
                <div className="card-content"> 
                    <div className="column">
                        <div className="row">
                            Fecha: 11/08/2024
                        </div>
                        <br></br>
                        <div className="row">
                            Producto: Tarjeta de crédito
                        </div>
                        <br></br>
                        <div className="row">
                            Motivo: Incumplimiento pago de cuotas de manejo
                        </div>
                    </div>
                    <br></br>
                    <button>Detalles</button>
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad: Banco de Bogotá </div>
                <br></br>
                <div className="card-content"> 
                    <div className="column">
                        <div className="row">
                            Fecha: 23/10/2024
                        </div>
                        <br></br>
                        <div className="row">
                            Producto: CDT
                        </div>
                        <br></br>
                        <div className="row">
                            Motivo: Buen monto ahorrado en CDT
                        </div>
                    </div>
                    <br></br>
                    <button>Detalles</button>
                </div>
            </div>
        </div>
    </>
}
export default HistReportes;