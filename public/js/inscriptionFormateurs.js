$("#sendButton").click(() => {
    if (($("#nom").val().trim() == "" || $("#prenoms").val().trim() == "" || $("#datenaissance").val().trim() == "" || $("#mail").val().trim() == "" || $("#contact").val().trim() == "" || $("#compweb").val().trim() == "" || $("#compmobile").val().trim() == "" || $("#compia").val().trim() == "" || $("#compdesign").val().trim() == "" || $("#niveau").val().trim() == "" || $("#domaine").val().trim() == "" || $("#pourquoi").val().trim() == "" || $("#experience").val().trim() == "")) {
        $('#modal').modal("show")
    } else {
        var data = {
            type: "Formateur",
            nom: $("#nom").val().trim(),
            prenoms: $("#prenoms").val().trim(),
            datenaissance: $("#datenaissance").val().trim(),
            mail: $("#mail").val().trim(),
            contact: $("#contact").val().trim(),
            //date: moment().format('dddd DD MMMM YYYY à HH:mm'),

            competences: {
                web: $("#compweb").val().trim(),
                mobile: $("#compmobile").val().trim(),
                ia: $("#compia").val().trim(),
                design: $("#compdesign").val().trim(),
                listsup: $("#listcompsup").val(),
            },

            domainneFormation : {
                nom : $("#domaine").val().trim(),
                experience : $("#experience").val().trim(),
                niveau : $("#niveau").val().trim(),
                pourquoi : $("#pourquoi").val(),
            }
        }
        $("#textSend").attr("hidden", false)
        $("#textError").attr("hidden", true)
        socket.emit("addUser", data)
    }
})
socket.on("addOk", () => {
    $("#textSend").attr("hidden", true)
    $("#textSuccess").attr("hidden", false)
    setTimeout(() => {
        $("#textSuccess").attr("hidden", true)
    }, 5000);
})

socket.on("phoneError", () => {
    $("#phoneError").attr("hidden", false)
    $("#textSend").attr("hidden", true)
    setTimeout(() => {
        $("#phoneError").attr("hidden", true)
    }, 5000);
})

socket.on("mailError", () => {
    $("#mailError").attr("hidden", false)
    $("#textSend").attr("hidden", true)
    setTimeout(() => {
        $("#mailError").attr("hidden", true)
    }, 5000);
})