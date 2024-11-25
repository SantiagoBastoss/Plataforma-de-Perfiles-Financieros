import React, { useState } from 'react'
import { ethers } from "ethers";

const RepoCliente = ()=>{

    const [pruebaGenerada, setPruebaGenerada] = useState(false);

    const reportar_cliente = async () => {

        
    }

    return <>
        <h2> Reportar a un cliente </h2>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Ingrese la información para el reporte: </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Cédula del cliente:
                        <input id="cedula"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        Producto:
                        <input id="producto"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        Motivo:
                        <input id="motivo"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        ¿Es negativo?:
                        <input id="negativo"></input>
                    </div>
                    <br></br>
                </div>
                <br></br>
                <br></br>
                <button onClick={reportar_cliente}> Reportar </button>
            </div>
        </div>
        <br></br>
    </>
}
export default RepoCliente;