import React from 'react';
import { useState } from 'react';
import {ethers} from 'ethers';
import { useNavigate } from 'react-router-dom';

const RegistroBanco = ({contratos})=>{

    const [account, setAccount] = useState('Vincule su billetera digital');

    const navigate = useNavigate();

    const registrar_banco = async () => {

        const nombre = document.querySelector("#name").value;
        const nit = Number(document.querySelector("#nit").value);
        const clave =  Number(document.querySelector("#key").value);

        if(typeof window.ethereum !== "undefined"){

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            const contract = new ethers.Contract(
                contratos.banco[0],
                contratos.banco[1],
                signer,
            );

            const transaction = await contract.registro_banco(nombre, nit, clave);
            transaction.wait();

            alert("Registro exitoso");
            navigate("/banco")

        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }

    const requestAccount = async () => {

        const cuenta = await window.ethereum.request({
            method:"eth_requestAccounts"
        });

        window.ethereum.on("accountsChanged", ()=>{
            window.location.reload()
        })

        setAccount(cuenta);
        alert("Cuenta conectada exitosamente");
    }
    

    return <>
        <h2>Registro Banco</h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Ingrese la información del banco: </div>
                <br></br>
                <div className="card-content"> 
                    <div className="column">
                        <div className="row">
                            Cuenta Metamask:
                            <p><small>{account}</small></p>
                        </div>
                        <button onClick={requestAccount}>Conectar con Metamask</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="row">
                            Nombre:
                            <input id="name"></input>
                        </div>
                        <br></br>
                        <div className="row">
                            NIT:
                            <input id="nit"></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Clave única (número de 10 dígitos):
                            <input id="key"></input>
                        </div>
                        <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <button onClick={registrar_banco}>Enviar</button>
                </div>
            </div>
        </div>
    </>
}
export default RegistroBanco;