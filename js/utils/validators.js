//VALIDACIONES GENERALES 
//COMPRUEBA QUE UN VALOR OBLIGATORIO REALMENTE CONTENGA INFORMACION

export function validarCampoObligatorio(valor) {
    //validar existencia del valor
    return (
        //el valor no debe ser undefined ni null
        valor !== undefined && valor !== null && String(valor).trim() !== ''
    )
}

//validar mmonto
export function validarMonto(monto) {
    const montoNumerico = Number(monto)

    return (
        Number.isFinite(montoNumerico) && montoNumerico > 0
    )
}

