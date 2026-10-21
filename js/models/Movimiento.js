//IMPORTAR UTILIDADES
import { generarId } from "../utils/helpers.js";

//MODELO MOVIMIENTO
export class Movimiento {
    constructor({
        id = generarId(),
        tipo, 
        monto, 
        descripcion = '',
        cuentaOrigen = null, 
        cuentaDestino = null,
        saldoResultante = null,
        fecha = new Date().toISOString(),
    }){
        this.id = id;
        this.tipo = tipo;
        this.monto = monto;
        this.descripcion = descripcion;
        this.cuentaOrigen = cuentaOrigen;
        this.cuentaDestino = cuentaDestino;
        this.saldoResultante =saldoResultante;
        this.fecha = fecha;
    }
}