$(document).ready(function() {
    var sesion = localStorage.getItem("x");
    
    if (sesion) {
      $("#sesion").hide();
      $("#usuario").show();
      $("#logoutBtn").show(); // Mostrar botón de cierre de sesión
      
      $.get("https://6463efbe127ad0b8f894a258.mockapi.io/Users", function(data) {
        var usuarioEncontrado = data.find(function(user) {
          return user.Ussername === sesion;
        });
  
        if (usuarioEncontrado) {
          $("#nombreUsuario").text(usuarioEncontrado.name);
        }
      });
    } else {
      $("#sesion").show();
      $("#usuario").hide();
      $("#logoutBtn").hide(); // Ocultar botón de cierre de sesión
    }
    
    $("#loginBtn").click(function() {
      var username = $("#username").val();
      var password = $("#password").val();
  
      $.get("https://6463efbe127ad0b8f894a258.mockapi.io/Users", function(data) {
        var matchFound = false;
        var objeto_actual = null;
        var session = null;
  
        $.each(data, function(index, obj) {
          console.log(obj.Ussername);
          if (obj.Ussername === username && obj.password === password) {
            matchFound = true;
            objeto_actual = obj;
          }
        });
  
        if (matchFound) {
          console.log("¡puedes entrar a la pagina!");
  
          $("#capa").append("<p>Username: " + objeto_actual.Ussername + "</p>");
          $("#capa").append("<p>Email: " + objeto_actual.email + "</p>");
  
          window.location.href = "index.html";
  
          session = objeto_actual.Ussername;
          localStorage.setItem("x", session);
          $("#logoutBtn").show(); // Mostrar botón de cierre de sesión al iniciar sesión
        } else {
          alert("La combinación de usuario y contraseña no coincide.");
        }
      });
    });
    
    $("#logoutBtn").click(function() {
      // Eliminar la clave de sesión del localStorage
      localStorage.removeItem("x");
      
      // Redireccionar a la página de inicio de sesión o a cualquier otra página
      window.location.href = "login.html";
    });
  });
  