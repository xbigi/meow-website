document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("previewImage").src = e.target.result;
            document.getElementById("previewImage").style.display = "block";
            document.getElementById("searchButton").disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("searchButton").addEventListener("click", function() {
    const fileInput = document.getElementById("imageUpload");

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Create a real form
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://www.google.com/searchbyimage/upload";
        form.enctype = "multipart/form-data";
        form.style.display = "none"; // Hide the form

        // Create the file input field
        const input = document.createElement("input");
        input.type = "file";
        input.name = "encoded_image";
        input.files = fileInput.files; // Assign the uploaded file

        // Append input to the form
        form.appendChild(input);
        document.body.appendChild(form);

        // Submit the form
        form.submit();
    } else {
        alert("Please upload an image first.");
    }
});
