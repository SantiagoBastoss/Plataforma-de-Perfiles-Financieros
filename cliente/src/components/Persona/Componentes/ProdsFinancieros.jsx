import React from 'react'
import { useState } from 'react'
import { groth16 } from 'snarkjs';
import { ethers } from 'ethers';


const ProdsFinancieros = ({infoContratos, usuario})=>{

    const prueba = async () => {

        const { proof, publicSignals } = await groth16.fullProve({a: 2, b: 4, c: 5, d: 475, e: 3}, "../../../../autenticador.wasm", "../../../../../autenticador_0001.zkey");

        const solidityCallData  = await groth16.exportSolidityCallData(proof, publicSignals);
        
        const pa =  [];

        const pB =  [[], []];

        const pC =  [];

        console.log("Prueba PA");

        pa.push(Number(proof.pi_a[0]));
        pa.push(Number(proof.pi_a[1]));
        console.log(pa);

        console.log("Prueba PB");

        pB[0].push(Number(proof.pi_b[0][0]));
        pB[0].push(Number(proof.pi_b[0][1]));
        pB[1].push(Number(proof.pi_b[1][0]));
        pB[1].push(Number(proof.pi_b[1][1]));
        console.log(pB);

        console.log("Prueba PC");

        pC.push(Number(proof.pi_c[0]));
        pC.push(Number(proof.pi_c[1]));
        console.log(pC);

        console.log("_pA: ");
        console.log(proof.pi_a[0]);
        console.log(typeof("su"));

        console.log("_pB: ");
        console.log(JSON.stringify(proof.pi_b.slice(0,2)));

        console.log("_pC: ");
        console.log(JSON.stringify(proof.pi_c.slice(0,2)));
    }

    const cargarProductos = async () => {

        console.log("NUEVO");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const nit = BigInt(document.querySelector("#nit").value);

        const contratoBanco = new ethers.Contract(
            infoContratos.banco[0],
            infoContratos.banco[1],
            signer,
        );

        const existeVerificacion = await contratoBanco.existe_verificacion(nit);

        if(existeVerificacion){
            const dirVerificacion = await contratoBanco.obtener_verificacion(nit);

            const contratoVerificacion = new ethers.Contract(
                dirVerificacion,
                infoContratos.verificacion[1],
                signer,
            );

            const claveUsuario = BigInt(prompt("Ingresa la clave que tienes en ese banco: "));
            const claveBanco = BigInt( await contratoVerificacion.dar_clave_banco());
            const claveSecreta = BigInt( await contratoBanco.dar_resultado_esperado(nit, usuario.documento));

            const _pA =  [];
            const _pB =  [[], []];
            const _pC =  [];

            const { proof, publicSignals } = await groth16.fullProve({a: usuario.documento+nit, b: claveUsuario, c: claveBanco, d: claveSecreta, e: BigInt(3)}, "../../../../autenticador.wasm", "../../../../../autenticador_0001.zkey");
            //const { proof, publicSignals } = await groth16.fullProve({a: 80240, b: 19876, c: 65432, d: 2197103190161320, e: 3}, "../../../../autenticador.wasm", "../../../../../autenticador_0001.zkey");

            const  prueba  = await groth16.exportSolidityCallData(proof, publicSignals);
            console.log(proof);
            console.log(prueba);
            //Preparación _pA, _pB, y _pC
            const _ppA = prueba.slice(0, 140);
            _pA.push(BigInt(_ppA.slice(2, 68)));
            _pA.push(BigInt(_ppA.slice(72, 138)));

            const _ppB = prueba.slice(141, 424);
            _pB[0].push(BigInt(_ppB.slice(3, 69)));
            _pB[0].push(BigInt(_ppB.slice(73, 139)));
            _pB[1].push(BigInt(_ppB.slice(144, 210)));
            _pB[1].push(BigInt(_ppB.slice(214, 280)));

            const _ppC = prueba.slice(425, 565);
            _pC.push(BigInt(_ppC.slice(2, 68)));
            _pC.push(BigInt(_ppC.slice(72, 138)));

            const response = await fetch("../../../../verification_key.json");
            const vKey = await response.json();

            console.log(publicSignals);


            console.log("PARS");
            console.log(_pA);
            console.log(_pB);
            console.log(_pC);


            /* const contratoGroth = new ethers.Contract(
                infoContratos.verifier[0],
                infoContratos.verifier[1],
                signer,
            ); */

            //const resultado = await groth16.verify(vKey, publicSignals, proof);
            //const resultado = await contratoGroth.verifyProof(_pA, _pB, _pC, [2197103190161320,80240,19876,65432]);
            
            const resultado = await contratoBanco.dar_productos_cliente(BigInt(usuario.documento), claveUsuario, nit, _pA, _pB, _pC);
            console.log("PRODUCTO RETORNADO");
            console.log(resultado);

        } else{
            alert("El banco no ha generado una ZKP. Contacte a su entidad.")
        }
    }

    return <>
        <h2>Productos Financieros</h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Escriba el NIT de la entidad:
                        <input id="nit"></input>
                    </div>
                    <br></br>
                    <button onClick={cargarProductos}>Consultar</button>
                </div>
            </div>
        </div>
    </>
}
export default ProdsFinancieros;