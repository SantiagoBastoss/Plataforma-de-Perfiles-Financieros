import React, {useCallback} from 'react'

const Bienvenida = ({account, loggedIn, changeLoggedTrue, asignarCuenta})=>{

    return <>
        <h1> Plataforma de perfiles financieros </h1>
        <p style={{ marginTop: "10px", marginLeft: "5px" }}>
            <small>Cuenta conectada: {account}</small>
        </p>
        <br></br>
        <button onClick={asignarCuenta}> Conectar con Metamask </button>
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
            <p></p>
            <div className="card">
                <div className="card-body">
                    <div className="card-title"> Persona </div>
                    <br></br>
                    <div className="card-content"> 
                        <div className="row">
                            <button onClick={changeLoggedTrue}>Ingresar</button>
                            <button>Registro</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Bienvenida;