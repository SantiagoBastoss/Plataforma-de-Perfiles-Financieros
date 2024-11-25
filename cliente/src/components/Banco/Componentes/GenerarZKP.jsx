import React, { useState } from 'react'
import { ethers } from "ethers";

const GenerarZKP = ({infoContratos})=>{

    const [pruebaGenerada, setPruebaGenerada] = useState(false);

    const generar_zkp = async () => {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contratoBanco = new ethers.Contract(
            infoContratos.banco[0],
            infoContratos.banco[1],
            signer,
        );

        const transaction = await contratoBanco.generar_prueba({value: 20});
        await transaction.wait();

        setPruebaGenerada(true);
        alert("ZKP generada correctamente");
    }

    return <>
        <h2> Generar ZKP </h2>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Sus ZKP activas: </div>
                <br></br>
                <div className="card-content"> 
                    {pruebaGenerada ? <p>Actualmente tiene una ZKP activa</p> : <p>Aún no ha generado una ZKP</p>}
                </div>
                <br></br>
                <br></br>
                <button onClick={generar_zkp}> Generar ZKP </button>
            </div>
        </div>
        <br></br>
    </>
}
export default GenerarZKP;