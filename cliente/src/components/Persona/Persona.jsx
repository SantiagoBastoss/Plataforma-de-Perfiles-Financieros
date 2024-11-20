import { Outlet } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import { ethers } from "ethers";
import abiPerfil from '../../../../artifacts/contracts/Perfil.sol/Perfil.json';

const Persona = ()=>{

    const registrarPersona = async () => {

        if(typeof window.ethereum !== "undefined"){

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            console.log(signer);
            const contract = new ethers.Contract(
                "0xd3ebDD76b4Bc0AEdC084bc40C0bbEA24DD4B7028",
                abiPerfil.abi,
                signer,
            );

            const transaction = await contract.registro("Carlos", 10392, "10/10/2003", "10/10/2021", 320434, "carlos@gmail.com");
            await transaction.wait();

            alert("Registro exitoso");
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }
    
    return <>
        <Navbar/>
        <br></br>
        <br></br>
        <br></br>
        <Perfil/> 
        <Outlet/>
        <button onClick={registrarPersona}>Prueba Registro</button>
    </>
}
export default Persona;


const Perfil = ()=>{

    return <>
        <h2> Mi Perfil </h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Nombre </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Andres cARNE
                        Score Bancario
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </>
}