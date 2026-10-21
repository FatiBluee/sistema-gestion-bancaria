//IMPORTAR UTILIDADES

import { generarId } from "../utils/helpers.js";

//MODELO CUENTA 
//representa una cuenta bancaria perteneciente a un usuario
export class Cuenta{
    constructor({
        id= generarId(),
        numeroCuenta, 
        tipo= 'Ahorro',
        saldo = 0,
        usuarioId, 
        fechaApertura = new Date().toISOString(),
        activa = true,
    }) {
        this.id = id;
        this.numeroCuenta = numeroCuenta;
        this.tipo = tipo;
        this.saldo = Number(saldo);
        this.usuarioId = usuarioId;
        this.fechaApertura = fechaApertura;
        this.activa = activa;
    }

    //DEPOSITAR
    depositar(monto) {
        this.saldo += Number(monto)
        return this.saldo
    }

    //RETIRAR
    retirar(monto) {
        this.saldo -= Number(monto)
        return this.saldo
    }
}