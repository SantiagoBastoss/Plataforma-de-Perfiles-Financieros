// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Perfil{

    struct Usuario{
        InfoConstante infoConst;
        InfoVariable infoVar;
        uint scoreBancario;
    }

    struct InfoConstante{
        string nombre;
        uint documento;
        string nacimiento;
        string expedicion;
    }

    struct InfoVariable{
        uint celular;
        string email;
    }

    struct Reporte{
        uint timestamp;
        string entidad;
        string producto;
        string motivo;
        bool negativo;
    }

    struct Producto{
        string tipo;
        string entidad;
        uint saldo;
        bool mora;
    }

    mapping(address=>Usuario) public perfiles;

    mapping(address=>Reporte[]) public reportes;

    mapping(address=>Producto[]) public productos;


    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }
    

    function registro(string calldata nombre, uint documento, string calldata nacimiento, string calldata expedicion, uint celular, string calldata email) external {
        
        InfoConstante memory infoConst = InfoConstante(nombre, documento, nacimiento, expedicion);
        InfoVariable memory infoVar = InfoVariable(celular, email);

        perfiles[msg.sender] = Usuario(infoConst, infoVar, 0);
    }


    function actualizarInfo(uint celular, string calldata email) external {

        perfiles[msg.sender].infoVar = InfoVariable(celular, email);
    }


    function reportar_usuario(address usuario, string calldata entidad, string calldata producto, string calldata motivo, bool negativo) external {

        reportes[usuario].push(Reporte(block.timestamp, entidad, producto, motivo, negativo));
    }


    function calcular_score() external payable {
        require(msg.value>10, "El valor de esta operacion es de 0,0001 ETH");

        uint reportesNegativos = 0;
        uint reportesPositivos = 0;
        uint productosMora = 0;

        uint maxScore = 1000;

        for(uint i=0; i<reportes[msg.sender].length; i++){
            if(reportes[msg.sender][i].negativo){
                reportesNegativos += 1;
            } else{
                reportesPositivos += 1;
            }
        }

        for(uint i=0; i<productos[msg.sender].length; i++){
            if(productos[msg.sender][i].mora){
                productosMora += 1;
            } 
        }

        perfiles[msg.sender].scoreBancario = maxScore - (100*reportesNegativos) + (50*reportesPositivos) - (120*productosMora);
        owner.transfer(msg.value);
    }
}