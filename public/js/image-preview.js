document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("imageInput");
    const preview = document.getElementById("preview");

    if (input && preview) {
        input.addEventListener("change", function (e) {
            const file = e.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    preview.src = event.target.result;
                    preview.style.display = "block";
                };

                reader.readAsDataURL(file);
            }
        });
    }
});