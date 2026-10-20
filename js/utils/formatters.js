//FORMATEADORES DE INFORMACION
//Convierte un valor numerico a una representacion monetaria utilizando pesos mexicanos

export function formatCurrency(valor){
    const numero = Number(valor)

    if(!Number.isFinite(numero)){
        return '$0.00'
    }

    //APLICAR FORMATO DE MONEDA
    return numero.toLocaleString('es-MX', {
        //formato monetario
        style: 'currency',
        //pesos mexicanos
        currency: 'MXN'  
    })
}

//FORMATEAR FECHA
//convierte una fecha a una representacion mas amigable utilizando la configuracion regional de Mexico
export function formatDate(fecha) {
    const fechaObjeto = new Date(fecha)
    //si la fecha no es valida retornamos ''
    if(Number.isNaN(fechaObjeto.getTime())){
        return ''
    }
    //fecha legible utilizando formato regional mexicano
    return fechaObjeto.toLocaleDateString('es-MX')
}

//FORMATEAR NUMERO DE CUENTA
export function formatAccountNumber(numeroCuenta) {
    const numero = String(numeroCuenta ?? '')

    //separar grupos de cuatro digitos
    return numero.replace(/(\d{4})(?=\d)/g,'$1 ')
}