import React from 'react';
import { useState } from 'react';
import {ethers} from 'ethers';
import { useNavigate } from 'react-router-dom';

const Registro = ({contratos})=>{

    const [account, setAccount] = useState('Vincule su billetera digital');

    const navigate = useNavigate();

    const registrarPersona = async () => {

        const nombre = document.querySelector("#name").value;
        console.log(nombre);
        const documento = Number(document.querySelector("#document").value);
        console.log(documento);
        const fechaNacimiento = document.querySelector("#date1").value;
        const fechaExpedicion = document.querySelector("#date2").value;
        const celular = Number(document.querySelector("#phone").value);
        const correo = document.querySelector("#email").value; 

        if(typeof window.ethereum !== "undefined"){

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            const contract = new ethers.Contract(
                contratos.perfil[0],
                contratos.perfil[1],
                signer,
            );

            const transaction = await contract.registro(nombre, documento, fechaNacimiento, fechaExpedicion, celular, correo);
            await transaction.wait();

            alert("Registro exitoso");
            navigate("/persona")

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
        <h2>Registro Persona</h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Ingrese su información: </div>
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
                            Documento:
                            <input id="document"></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Fecha de nacimiento (dd/mm/aaaa):
                            <input id="date1"></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Fecha de expedición de la cédula (dd/mm/aaaa):
                            <input id="date2"></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Celular:
                            <input id="phone"></input>
                        </div>
                        <br></br>
                        <div className="row">
                            Correo electrónico:
                            <input id="email"></input>
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