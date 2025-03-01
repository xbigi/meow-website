// when a user selects an image, show a preview and enable the search button
document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0]; // get the selected file

    if (file) {
        const reader = new FileReader(); // create a file reader
        reader.onload = function (e) {
            document.getElementById("previewImage").src = e.target.result; // set image preview
            document.getElementById("previewImage").style.display = "block"; // show the image
            document.getElementById("searchButton").disabled = false; // enable the search button
        };
        reader.readAsDataURL(file); // read the file as a data URL
    }
});

// when the user clicks the search button, upload the image to google reverse search
document.getElementById("searchButton").addEventListener("click", function() {
    const fileInput = document.getElementById("imageUpload"); // get the file input

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0]; // get the selected file

        // create a hidden form to upload the image to google reverse search
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://www.google.com/searchbyimage/upload";
        form.enctype = "multipart/form-data";
        form.style.display = "none"; // hide the form

        // create the file input field inside the form
        const input = document.createElement("input");
        input.type = "file";
        input.name = "encoded_image";
        input.files = fileInput.files; // add the uploaded file

        // add the input field to the form
        form.appendChild(input);
        document.body.appendChild(form);

        // submit the form to google
        form.submit();
    } else {
        alert("please upload an image first."); //alert if no image is uploaded
    }
});
