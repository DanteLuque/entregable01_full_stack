document.getElementById("imageInput")?.addEventListener("change", function (e) {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB
    const preview = document.getElementById("preview");

    if (file && file.size > maxSize) {
        alert("La imagen supera los 2MB. Por favor, selecciona una más pequeña.");
        e.target.value = ""; 
        if (preview) {
            preview.style.display = "none";
            preview.src = "#";
        }
        return;
    }
});