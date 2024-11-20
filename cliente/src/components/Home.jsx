import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ()=>{

    const [account, setAccount] = useState('No se ha vinculado su billetera digital');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const requestAccount = async () => {

        if(loggedIn){
            alert("Ya se ha conectado su cuenta de Metamask. Seleccione ingresar, según su perfil.")
        } else {
            const cuenta = await window.ethereum.request({
                method:"eth_requestAccounts"
            });

            window.ethereum.on("accountsChanged", ()=>{
                window.location.reload()
            })

            setAccount(cuenta);
            setLoggedIn(true);
            alert("Cuenta conectada exitosamente");
        }
    }

    const ingresoPersona = async () => {

        if(loggedIn){
            navigate("/persona");
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }


    return <>
        <h1> Plataforma de perfiles financieros </h1>
            <p style={{ marginTop: "10px", marginLeft: "5px" }}>
                <small>Cuenta conectada: {account}</small>
            </p>
            <br></br>
            <button onClick={requestAccount}> Conectar con Metamask </button>
            <p></p>
            <br></br>
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title"> Banco </div>
                        <br></br>
                        <div className="card-content"> 
                            <div className="row">
                                <button>Ingresar</button>
                                <button>Registro</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title"> Persona </div>
                        <br></br>
                        <div className="card-content"> 
                            <div className="row">
                                <button onClick={ingresoPersona}>Ingresar</button>
                                <button onClick={()=>{navigate("/persona/registro")}}>Registro</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
}
export default Home;