import { useEffect, useState } from 'react'
import './App.css'
import Bienvenida from './components/Bienvenida'

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState('Not connected')

  useEffect(()=>{
    const template = async()=>{

      const contractAddress="";
      const contractABI="";

      try {
        const {ethereum} = window;

        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })

        window.ethereum.on("accountsChanged", ()=>{
          window.location.reload()
        })

        setAccount(account);

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
      <img src={"./assets/logo.jpg"} className="img-fluid" alt=".." width="100%"/>
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account: {account}</small>
      </p>
      <Bienvenida state={state}></Bienvenida>
    </div>
  )
}

export default App
