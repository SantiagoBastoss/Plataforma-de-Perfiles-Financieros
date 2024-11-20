import React from 'react'
import { useState } from 'react'

const Notificaciones = ()=>{

    const registrarPersona = async () => {

        if(loggedIn){
            changeLoggedTrue();
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }

    return <>
        <p>Notificaciones</p>
    </>
}
export default Notificaciones;