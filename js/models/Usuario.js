//IMPORTAR UTILIDADES
import { generarId } from "../utils/helpers.js";

//MODELO USUARIO
//representa las personas registradas dentro del sistema

export class Usuario {
    constructor({
        id = generarId(),
        nombre, 
        email,
        telefono = '',
        password,
        activo = true,
    }){
        //ASIGNAR PROPIEDADES
        //this representa la instancia que estamos creando
        this.id = id;
        this.nombre = nombre,
        this.email = email,
        this.telefono = telefono,
        this.password = password, 
        this.activo = activo
    }
}