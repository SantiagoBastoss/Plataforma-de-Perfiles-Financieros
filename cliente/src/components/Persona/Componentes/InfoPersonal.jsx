import React from 'react'

const InfoPersonal = ({user})=>{

    return <>
        <h2>Información Personal </h2>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Número de documento </div>
                <br></br>
                <div className="card-content"> 
                    {String(user.documento)}
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Fecha de Nacimiento </div>
                <br></br>
                <div className="card-content"> 
                    {user.fechaNacimiento}
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Fecha de Expedición de la cédula </div>
                <br></br>
                <div className="card-content"> 
                    {user.fechaExpedicion}
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Celular </div>
                <br></br>
                <div className="card-content"> 
                    {String(user.celular)}
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Correo electrónico </div>
                <br></br>
                <div className="card-content"> 
                    {user.correo}
                </div>
            </div>
        </div>
    </>
}
export default InfoPersonal;