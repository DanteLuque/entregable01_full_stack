document.addEventListener("DOMContentLoaded", () => {
    //create/edit
    document.querySelectorAll("form[data-confirm]").forEach((formulario) => {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            Swal.fire({
                title: formulario.dataset.title || "¿Está seguro?",
                text: formulario.dataset.text || "Confirme la operación.",
                icon: formulario.dataset.icon || "question",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#2980b9",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#c0392b",
            }).then((result) => {
                if (result.isConfirmed) {
                    formulario.submit();
                }
            });
        });
    });

    //delete
    document.querySelectorAll("a[data-confirm-delete]").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const url = this.href;

            Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                confirmButtonText: "Sí, eliminar",
                confirmButtonColor: "#e74c3c",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#95a5a6",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = url;
                }
            });
        });
    });
});
