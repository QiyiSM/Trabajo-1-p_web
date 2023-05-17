$(document).ready(function() {
    $("#btnRegistrar").click(function(event) {
      event.preventDefault(); // Prevenir el envío del formulario por defecto
  
      var ussername = $("#txtUser").val();
      var password = $("#txtPass").val();
      var name = $("#txtName").val();
      var email = $("#txtemail").val();
  
      // Verificar si el Ussername ya existe en la API
      $.ajax({
        url: "https://6463efbe127ad0b8f894a258.mockapi.io/Users",
        type: "GET",
        data: { search: ussername },
        success: function(data) {
          if (data.length > 0) {
            // El Ussername ya existe
            $("#regi").text("Error: el usuario ya existe.");
            $("#regi").removeClass("d-none");
          } else {
            // El Ussername no existe, realizar el registro
            var objeto = {
              Ussername: ussername,
              password: password,
              name: name,
              email: email
            };
  
            $.post("https://6463efbe127ad0b8f894a258.mockapi.io/Users", objeto, function(data) {
              console.log("Registrado OK:");
              console.log(data);
              $("#regi").text("¡Registro exitoso!");
              $("#regi").removeClass("alert-danger");
              $("#regi").addClass("alert-success");
              $("#regi").removeClass("d-none");
              setTimeout(function() {
                window.location.href = "login.html";
              }, 2000); 
            });
          }
        },
        error: function() {
          $("#regi").text("Error al verificar el Ussername. Por favor, inténtelo nuevamente.");
          $("#regi").removeClass("d-none");
        }
      });
    });
  });