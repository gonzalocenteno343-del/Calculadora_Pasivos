const formulario = document.getElementById("formCredito");
const resultadoCuota = document.getElementById("resultadoCuota");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const cuota = Number(document.getElementById("cuota").value);
    const frecuencia = document.getElementById("frecuencia").value;

    let factor = 1;

    if (frecuencia === "semanal") {
        factor = 4;
    } else if (frecuencia === "quincenal") {
        factor = 2;
    } else if (frecuencia === "mensual") {
        factor = 1;
    }

    const cuotaMensual = cuota * factor;
    const fechaApertura = new Date(
    document.getElementById("fechaApertura").value + "T00:00:00"
);

const fechaReporte = new Date(
    document.getElementById("fechaReporte").value + "T00:00:00"
);

const mesesTranscurridos = calcularMesesCompletos(
    fechaApertura,
    fechaReporte
);
const plazo = Number(document.getElementById("plazo").value);

const mesesRestantes = plazo - mesesTranscurridos;
const saldo = Number(document.getElementById("saldo").value);

let cortoPlazo;
let largoPlazo;

if (mesesRestantes <= 12) {

    cortoPlazo = saldo;
    largoPlazo = 0;

} else {

    const valorMensual = saldo / mesesRestantes;

    cortoPlazo = valorMensual * 12;
    largoPlazo = valorMensual * (mesesRestantes - 12);
}

document.getElementById("resultadoPasivos").innerHTML =
    "<strong>Pasivo a corto plazo:</strong> C$ " +
    cortoPlazo.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) +
    "<br><br>" +
    "<strong>Pasivo a largo plazo:</strong> C$ " +
    largoPlazo.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

const institucion = document.getElementById("institucion").value;
const tipo = document.getElementById("tipo").value;
const monto = Number(document.getElementById("monto").value);

const listaCreditos = document.getElementById("listaCreditos");

const fila = document.createElement("tr");

fila.innerHTML = `
    <td>${institucion}</td>
    <td>${tipo}</td>
    <td>C$ ${monto.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</td>
    <td>C$ ${saldo.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</td>
    <td>C$ ${cortoPlazo.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</td>
    <td>C$ ${largoPlazo.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</td>
    <td>C$ ${cuotaMensual.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</td>
`;
listaCreditos.appendChild(fila);
    "<strong>Pasivo a corto plazo:</strong> C$ " +
    cortoPlazo.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) +
    "<br><br>" +
    "<strong>Pasivo a largo plazo:</strong> C$ " +
    largoPlazo.toLocaleString("es-NI", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

document.getElementById("resultadoRestantes").innerHTML =
    "<strong>Meses restantes:</strong> " +
    mesesRestantes;
    resultadoCuota.innerHTML =
        "<strong>Cuota mensual total:</strong> C$ " +
        cuotaMensual.toLocaleString("es-NI", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

});
function calcularMesesCompletos(fechaInicio, fechaFin) {

    let meses =
        (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 +
        (fechaFin.getMonth() - fechaInicio.getMonth());

    if (fechaFin.getDate() < fechaInicio.getDate()) {
        meses--;
    }

    return meses;
}