// Função de aviso para deletar aluno!
(function readyJS(win, doc) {
  if (doc.querySelectorAll(".deletar")) {
    for (let i = 0; i < doc.querySelectorAll(".deletar").length; i++) {
      doc.querySelectorAll(".deletar")
        [i].addEventListener("click", function (event) {
          if (confirm("Deseja mesmo apagar este aluno?")) {
            return true;
          } else {
            event.preventDefault();
          }
        });
    }
  }s
})(window, document);

window.onload = function mostrarData() {
  var dNow = new Date();
  var localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
  document.getElementById('hora').innerHTML = "Data: " + localdate;
  }
  
  function cleanForm() {
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("ibge").value = "";
  }
  
  function retorno(conteudo) {
    if (!("erro" in conteudo)) {
      document.getElementById("rua").value = conteudo.logradouro;
      document.getElementById("bairro").value = conteudo.bairro;
      document.getElementById("cidade").value = conteudo.localidade;
      document.getElementById("uf").value = conteudo.uf;
      document.getElementById("ibge").value = conteudo.ibge;
    } else {
      cleanForm();
      alert("CEP não encontrado.");
    }
  }
  
  function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, "");
  
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
  
      if (validacep.test(cep)) {
        document.getElementById("rua").value = "...";
        document.getElementById("bairro").value = "...";
        document.getElementById("cidade").value = "...";
        document.getElementById("uf").value = "...";
        document.getElementById("ibge").value = "...";
  
        var script = document.createElement("script");
  
        script.src =
          "https://viacep.com.br/ws/" + cep + "/json/?callback=retorno";
  
        document.body.appendChild(script);
      } else {
        cleanForm();
        alert("Formato de CEP inválido.");
      }
    } else {
      cleanForm();
    }
  }
