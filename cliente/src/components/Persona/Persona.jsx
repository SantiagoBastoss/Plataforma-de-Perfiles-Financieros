import { Outlet } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abiPerfil from '../../../../artifacts/contracts/Perfil.sol/Perfil.json';


const Persona = ()=>{

    const [usuario, setUsuario] = useState({
        nombre: null,
        documento: null,
        fechaNacimiento: null,
        fechaExpedicion: null,
        celular: null,
        correo: null,
    });

    useEffect(() => {

        const llama = async ()=>{

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
                
            const contract = new ethers.Contract(
                "0xC21D1F6fA0e7dEf9b7F61fc6A1cb27f123b7Bf42",
                abiPerfil.abi,
                signer,
            );

            const resultado = await contract.darInfo();
            console.log("=========");
            console.log(resultado);
            console.log("=========");

            const nombre = resultado[0][0];
            const documento = resultado[0][1];
            const fechaNacimiento = resultado[0][2];
            const fechaExpedicion = resultado[0][3];

            const celular = resultado[1][0];
            const correo = resultado[1][1];

            setUsuario({nombre, documento, fechaNacimiento, fechaExpedicion, celular, correo});
            console.log({usuario});
        }

        llama();
    }, []);
    
    
    return <>
        <Navbar/>
        <br></br>
        <br></br>
        <br></br>
        <Perfil usuario={usuario}/> 
        <Outlet />
    </>
}
export default Persona;


const Perfil = ({usuario})=>{

    return <>
        <h2> Mi Perfil </h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Nombre </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        {usuario.nombre}
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </>
}