import React, {useCallback} from 'react'
import { useEffect, useState } from 'react'

const Registro = ()=>{

    const registrarPersona = async () => {

        if(loggedIn){
            changeLoggedTrue();
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }

    return <>
        
    </>
}
export default Registro;