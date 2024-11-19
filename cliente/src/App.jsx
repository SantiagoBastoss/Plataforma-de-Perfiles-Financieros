import { useEffect, useState } from 'react'
import './App.css'
import Bienvenida from './components/Bienvenida'
import {ethers} from "ethers"
import Persona from './components/Persona';
import abiPerfil from '../../artifacts/contracts/Perfil.sol/Perfil.json';
import abiBanco from '../../artifacts/contracts/Banco.sol/Banco.json';
import abiGroth16Verifier from '../../artifacts/contracts/Groth16Verifier.sol/Groth16Verifier.json';
import abiVerificacion from '../../artifacts/contracts/Verificacion.sol/Verificacion.json';


function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [contractInstance, setContractInstance] = useState({
    contrato: null 
  })


  //const contratos = {
    //"registro": ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", abiPerfil.abi],
    //"banco": ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", abiPerfil.abi]
  //};


  //const [account, setAccount] = useState('No se ha vinculado su billetera digital');

  const [user, setUser] = useState('Not defined');

  const [loggedIn, setLoggedIn] = useState(false);

  //const {ethereum} = window;

  async function requestAccount(){
    
    await window.ethereum.request({
      method:"eth_requestAccounts"
    });
  }

  const asignar_cuenta = async()=>{

    if(loggedIn){
      alert("Ya hay una cuenta conectada");

    } else {
      const account = await window.ethereum.request({
        method:"eth_requestAccounts"
      })

      window.ethereum.on("accountsChanged", ()=>{
        window.location.reload()
      })

      //setAccount(account);
      setLoggedIn(true);
    }
  }



  return (
    <div className="App">
      <img src={"./assets/logo.jpg"} className="img-fluid" alt="" width="100%"/>
      {loggedIn ? <Persona contrat={contractInstance} changeLoggedFalse={()=>{setLoggedIn(false); setAccount('null');}}/>: <Bienvenida loggedIn={loggedIn} changeLoggedTrue={()=>setLoggedIn(true)} asignarCuenta={asignar_cuenta}></Bienvenida>}
      
    </div>
  )
}

export default App
