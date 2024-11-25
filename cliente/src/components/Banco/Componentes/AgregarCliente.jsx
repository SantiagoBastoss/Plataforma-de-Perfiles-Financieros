import React, { useState } from 'react'
import { ethers } from "ethers";

const AgregarCliente = ({infoContratos})=>{

    const [pruebaGenerada, setPruebaGenerada] = useState(false);

    const agregar_cliente = async () => {

        const nombre = document.querySelector("#name").value;
        const documento = Number(document.querySelector("#document").value);
        const clave =  Number(document.querySelector("#clave").value);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contratoBanco = new ethers.Contract(
            infoContratos.banco[0],
            infoContratos.banco[1],
            signer,
        );

        const transaction = await contratoBanco.agregar_cliente(nombre, documento, clave);
        await transaction.wait();

        setPruebaGenerada(true);
        alert("Cliente agregado con éxito.");
    }

    return <>
        <h2> Nuevo cliente </h2>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Ingrese la información del cliente: </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Nombre:
                        <input id="name"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        Documento:
                        <input id="document"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        Clave ingreso:
                        <input id="clave"></input>
                    </div>
                    <br></br>
                </div>
                <br></br>
                <br></br>
                <button onClick={agregar_cliente}> Agregar </button>
            </div>
        </div>
        <br></br>
    </>
}
export default AgregarCliente;