import React from 'react'
import { useState } from 'react'

const ProdsFinancieros = ({infoContratos})=>{

    const cargarProductos = async () => {

        const claveUsuario = prompt("Ingresa la clave que tienes en ese banco: ");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
                
        const contract = new ethers.Contract(
            infoContratos.perfil[0],
            infoContratos.perfil[1],
            signer,
        );

        const resultado = await contract.darInfo();
    }

    return <>
        <h2>Productos Financieros</h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Escriba el NIT de la entidad:
                        <input id="nit"></input>
                    </div>
                    <br></br>
                    <button>Consultar</button>
                </div>
            </div>
        </div>
    </>
}
export default ProdsFinancieros;