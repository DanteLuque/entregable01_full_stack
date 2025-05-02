document.addEventListener('DOMContentLoaded', function () {
    const precioInput = document.getElementById('precio');
    const cuotasInput = document.getElementById('cuotas');
    const descuentoInput = document.getElementById('descuento');

    function toggleFields() {
        const precio = parseFloat(precioInput.value);
        const shouldDisable = isNaN(precio) || precio <= 0;

        cuotasInput.disabled = shouldDisable;
        descuentoInput.disabled = shouldDisable;

        if (shouldDisable) {
            cuotasInput.value = '';
            descuentoInput.value = '';
        }
    }

    toggleFields();
    precioInput.addEventListener('input', toggleFields);
});
