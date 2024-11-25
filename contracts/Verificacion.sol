// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import './Groth16Verifier.sol';


contract Verificacion{

    uint256 nitBanco;
    uint256 claveBanco;
    uint256 resultadoPrueba;

    //|uint256[2] _pA = [0x1a2a3b6e2ba804a4d3466a5b9047b672da212172728e6fb903dda6771b25cbbc, 0x108686857389327fd6b1872c112f3ff8daed6127eeba8d55103d6ebeab4db1e2];
    //uint256[2][2] _pB = [[0x2e94b1fb1aafb2b2e7fb6776f3e50de2da86f19c844579629204c26d00d1a0f5, 0x2b4fe218a04bfafe9bc14f105fb31f59598664cf1bd25fd354697bfa6289bbf5],[0x2b23949fada2b6a6f499115a8ac5f1c3d455186df0f1353b7663c706627ae25d, 0x076a8ba7e1c7d4551921f900598c7c57af8fef79fdc792f0ca4e9e2f3bdd4fd2]];
    //uint256[2] _pC = [0x2198f7f4ed785cf8a50a92310bc21b64e0b7acd3175cdd3dd8742110323c0ed5, 0x05227cbeb1683d376aa494f4f7584aa1b3756c5a5f7766c78fb8f0ecc0705636];

    address payable owner;

    Groth16Verifier zkp;

    constructor(uint256 _nitBanco, uint256 _claveBanco) {
        nitBanco = _nitBanco;
        claveBanco = _claveBanco;
        
        zkp = new Groth16Verifier();
        owner = payable(msg.sender);
    }

    function actualizar_clave(uint256 nuevaClave) external payable{
        require(msg.value==10, "El valor de esta operacion es de 10 ETH");
        claveBanco = nuevaClave;
        owner.transfer(msg.value);
    }

    function verificar_zkp(uint _cedula, uint _claveReal, uint _claveIngresada, uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC) external view returns(bool resultado){

        uint256 docCliente = uint256(_cedula);
        uint256 claveIngresada = uint256(_claveIngresada);

        uint256 _clave_secreta = calcular_clave_secreta(docCliente+nitBanco, uint256(_claveReal));

        resultado = zkp.verifyProof(_pA, _pB, _pC, [_clave_secreta, docCliente+nitBanco, claveIngresada, claveBanco]);
        return resultado;
    }

    function calcular_clave_secreta(uint _a, uint _b) private view returns (uint256 clave_secreta) {

        uint256 a = uint256(_a);
        uint256 b = uint256(_b);
        uint256 c = uint256(claveBanco);

        clave_secreta = ((((b+c)*a)+3)+(a+b+c)+((((b+c)*a)+3)*3))*(a+3);
        return clave_secreta;
    }

    function dar_clave_secreta(uint _a, uint _b) external view returns (uint256 clave_secreta) {

        clave_secreta = calcular_clave_secreta(_a, _b);
        return clave_secreta;
    }

    function dar_clave_banco() external view returns (uint256) {
        return claveBanco;
    }
}