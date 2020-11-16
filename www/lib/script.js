function Limpar()
{
  $('#nome').val("");
  $('#email').val("");
  $('#senha').val("");
}

function Atualizar()
{
  $.getJSON('http://profrodolfo.com.br/webservice/index.php?listar',function(retorno)
  {
    var lista = "";

    for(i = 0; i < retorno.length; i++)
    {
      lista += '<li class="mt-5">Nome: '+retorno[i].nm_aluno+"<br>Email: "+retorno[i].ds_email+'</li> <button class ="btn btn-outline-danger btn-sm mt-3  excluir" value="'+retorno[i].cd_aluno+'">Excluir</button><button class ="btn btn-outline-success btn-sm mt-3 ml-2 atualizar" value="'+retorno[i].cd_aluno+'">Atualizar</button><br>';

      $("#lista").html(lista);
    }
  });
}

$(document).on("click","#cadastrar",function()
{
  if($(this).html() == "Atualizar")
  {
    var dados = 
    {
      "cd": $('#cd').val(),
      "nome": $('#nome').val(),
      "email": $('#email').val(),
      "senha": $('#senha').val()
    }
    $.ajax
    ({
        url: 'http://profrodolfo.com.br/webservice/index.php',
        data: dados,
        type: 'post',
        success:function(retorno)
        {
          navigator.notification.alert(retorno);
          Limpar();
          Atualizar();
        },
        error: function(retorno)
        {
          navigator.notification.alert("Erro de Atualização");
          Limpar();
          Atualizar();
        }
    })

  }
  else
  {
      var dados = 
    {
      "nome": $('#nome').val(),
      "email": $('#email').val(),
      "senha": $('#senha').val()
    }
    $.ajax
    ({
        url: 'http://profrodolfo.com.br/webservice/index.php',
        data: dados,
        type: 'post',
        success:function(retorno)
        {
          navigator.notification.alert(retorno);
          Limpar();
          Atualizar();
        },
        error: function(retorno)
        {
          navigator.notification.alert("Erro de Cadastro");
          Limpar();
          Atualizar();
        },
    })
  }

});

$(document).ready(function()
{
    Atualizar();
});

$(document).on('click','.excluir',function()
{
  var id = $(this).val();

  $.ajax
    ({
        url: 'http://profrodolfo.com.br/webservice/index.php?excluir='+id,
        type: 'get',
        success:function(retorno)
        {
          navigator.notification.alert(retorno);
          Atualizar();
        },
        error: function(retorno)
        {
          navigator.notification.alert("Erro de Exclusão");
          Atualizar();
        },
    });

});

$(document).on('click','.atualizar',function()
{
  var id = $(this).val();

   $.getJSON('http://profrodolfo.com.br/webservice/index.php?listar='+id,function(retorno)
   {
        $('#nome').val(retorno[0].nm_aluno);
        $('#email').val(retorno[0].ds_email);
        $('#senha').val(retorno[0].ds_senha);
        $('#cadastrar').removeClass();
        $('#cadastrar').addClass("btn btn-outline-success btn-lg");
        $('#cadastrar').html("Atualizar");
        $("#cd").val(retorno[0].cd_aluno)
   })
});