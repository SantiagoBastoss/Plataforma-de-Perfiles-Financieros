import React, { useState } from 'react'
import { ethers } from "ethers";

const AgregarProducto = ({infoContratos})=>{

    const [pruebaGenerada, setPruebaGenerada] = useState(false);

    const agregar_producto = async () => {

        const cedula = Number(document.querySelector("#cedula").value);
        const numero = Number(document.querySelector("#numero").value);
        const tipo = document.querySelector("#tipo").value;
        const saldo =  Number(document.querySelector("#saldo").value);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contratoBanco = new ethers.Contract(
            infoContratos.banco[0],
            infoContratos.banco[1],
            signer,
        );

        const transaction = await contratoBanco.agregar_producto_cliente(cedula, numero, tipo, saldo);
        await transaction.wait();

        setPruebaGenerada(true);
        alert("Producto agregado al cliente con éxito.");
    }

    return <>
        <h2> Nuevo Producto </h2>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Ingrese la información del cliente: </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Cédula del cliente:
                        <input id="cedula"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        Número:
                        <input id="numero"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        Tipo:
                        <input id="tipo"></input>
                    </div>
                    <br></br>
                    <div className="row">
                        Saldo:
                        <input id="saldo"></input>
                    </div>
                    <br></br>
                </div>
                <br></br>
                <br></br>
                <button onClick={agregar_producto}> Agregar </button>
            </div>
        </div>
        <br></br>
    </>
}
export default AgregarProducto;