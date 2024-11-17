import { useEffect, useState } from 'react'
import './App.css'
import Bienvenida from './components/Bienvenida'
import {ethers} from "ethers"
import Persona from './components/Persona';

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState('No se ha vinculado su billetera digital');

  const [user, setUser] = useState('Not defined');

  const [loggedIn, setLoggedIn] = useState(false);

  const {ethereum} = window;

  const asignar_cuenta = async()=>{

    if(loggedIn){
      alert("Ya hay una cuenta conectada");

    } else {
      const account = await ethereum.request({
        method:"eth_requestAccounts"
      })

      window.ethereum.on("accountsChanged", ()=>{
        window.location.reload()
      })

      setAccount(account);
      setLoggedIn(true);
    }
  }


  useEffect(()=>{
    const template = async()=>{

      const contractAddress="";
      const contractABI="";

      try {

        console.log(loggedIn);

        if(!loggedIn){
          asignar_cuenta();
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        setState({provider, signer, contract});

      } catch (error) {
        console.log(error)
      }
    }
    template();
  }, [])

  return (
    <div className="App">
      <img src={"./assets/logo.jpg"} className="img-fluid" alt="" width="100%"/>
      {loggedIn ? <Persona changeLoggedFalse={()=>{setLoggedIn(false); setAccount('null');}}/>: <Bienvenida account={account} loggedIn={loggedIn} changeLoggedTrue={()=>setLoggedIn(true)} asignarCuenta={asignar_cuenta}></Bienvenida>}
      
    </div>
  )
}

export default App
