
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';

// Obtener los elementos del HTML
const expresion = document.getElementById('expresion');
const texto = document.getElementById('texto');
const comparar = document.getElementById('comparar');
const limpiar = document.getElementById('limpiar');


comparar.addEventListener('click', function() {

    try {
        const valorExpresion = expresion.value.trim();
        if (!valorExpresion) {
            Swal.fire('Falta la expresión', 'Escribe una expresión regular para validar.', 'warning');
            return;
        }

        // Acepta tanto ^[A-Z][a-z]+$ como /patrón/flags.
        const expresionConDelimitadores = valorExpresion.match(/^\/([\s\S]*)\/([dgimsuvy]*)$/);
        const regex = expresionConDelimitadores
            ? new RegExp(expresionConDelimitadores[1], expresionConDelimitadores[2])
            : new RegExp(valorExpresion);

        if (regex.test(texto.value)) {
            Swal.fire('Correcto', 'El texto cumple con la expresión regular', 'success');
        } else {
            Swal.fire('No coincide', 'El texto no cumple con la expresión regular. Para ^[A-Z][a-z]+$, prueba con "Maria" (sin espacios).', 'warning');
        }

    } catch (error) {
        Swal.fire('Expresión no válida', 'Revisa la sintaxis de la expresión regular y sus indicadores.', 'error');
        console.log(error);
    }

});

limpiar.addEventListener('click', function() {
    expresion.value = '';
    texto.value = '';
    expresion.focus();
});