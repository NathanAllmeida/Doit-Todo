var table = "";
var table_list = "";

function MudarAba(aba_atual,proxima_aba){
    $("#"+aba_atual).removeClass('in active show');
    $("#"+proxima_aba).addClass('in active show');
}

function AtualizarNumeros(){
    var count_success = $("#TblList .btn-success").length;
    var count_total = $("#TblList .btn-check").length;

    $("#count-tasks").text(count_success+"/"+count_total);
};
$(document).ready(function(){
    $("#alert-success").hide();
    table = $('#TblMain').DataTable({
            "oLanguage": {
                "sEmptyTable": "Nenhum registro encontrado.",
                "sInfo": "_TOTAL_ registros",
                "sInfoEmpty": "0 Registros",
                "sInfoFiltered": "(De _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "Mostrar _MENU_ registros por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado.",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                }
            },
            "columnDefs": [
                {
                    "data": null,
                    "defaultContent": "<button class='btn btn-primary btn-view'><i class='fas fa-list-ul'></i> Visualizar</button> "+"<button class='btn btn-danger btn-delete' ><i class='fas fa-trash-alt'></i> Excluir</button>",                
                    "targets":-1,
                }
            ],"fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                var situacao = aData[1];    
                if (situacao=='Completa'){
                    $('td', nRow).css('color', 'green');                        
                }else{                        
                    $('td', nRow).css('color', 'red');                        
                }
            }
    });
    table_list = $('#TblList').DataTable({
            "oLanguage": {
                "sEmptyTable": "Nenhum registro encontrado.",
                "sInfo": "_TOTAL_ registros",
                "sInfoEmpty": "0 Registros",
                "sInfoFiltered": "(De _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "Mostrar _MENU_ registros por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado.",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                }
            },
            "columnDefs": [
                {
                    "data": null,
                    "defaultContent": "<button class='btn btn-primary btn-update'><i class='fas fa-sync-alt'></i></button> "+"<button class='btn btn-check'><i class='fas fa-check'></i></button> "+"<button class='btn btn-danger btn-delete'><i class='fas fa-trash-alt'></i></button>",                
                    "targets":-1,
                }
            ],
           /* "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                var situacao = aData[1];    
                if (situacao=='Completa'){
                    $('td', nRow).css('color', 'green');                        
                }else{                        
                    $('td', nRow).css('color', 'red');                        
                }
            }*/
    });

	$("#TblMain tbody").on("click", ".btn-view", function () {
        MudarAba('tab-main','tab-list')

        var data = table.row($(this).parents('tr')).data();
        AtualizarNumeros();
        $("#name-list").text(data[0]);
	});
    $("#TblMain tbody").on("click", ".btn-delete", function () {
        $("#ModalDelete").modal();
    });

    $("#TblList tbody").on("click", ".btn-delete", function () {
	    $("#ModalDelete").modal();
	});

	$("#del-btn-delete").click(function(){
		$("#ModalDelete").modal('toggle');
	});

    $("#btn-back").click(function(){
        MudarAba('tab-list','tab-main');
    });

    $("#TblList tbody").on("click", ".btn-check", function () {
        $(this).toggleClass('btn-success');        
        table_list.row($(this).parents('tr').toggleClass('td-success'));
        AtualizarNumeros();
    });
    $("#TblList tbody").on("click", ".btn-update", function () {
        $("#ModalEdit").modal();
        var data = table_list.row($(this).parents('tr')).data();
        $("#ed-task").val(data[0])
    }); 

    $("#send-task").click(function(){
        
        var task = $("#ad-task").val();

        $("#alert-success").show();
        $("#message-alert").text('Tarefa adicionada com Sucesso!');
        setTimeout(function(){
           $("#alert-success").hide();
        },2000);
        //Apenas simulando o resultado que traria do banco de dados;

        table_list.row.add([task]).draw();        
        //$("#TblList tbody").append('<tr>'+task+'<td></td><td></td></tr>');
        AtualizarNumeros();
    });
    

    $("#send-todo-list").click(function(){        
        var task = $("#ad-todo-list").val();

        $("#alert-success").show();
        $("#message-alert").text('Lista adicionada com Sucesso!');
        setTimeout(function(){
           $("#alert-success").hide();
        },2000);
        //Apenas simulando o resultado que traria do banco de dados;
        table.row.add([task,'Incompleta','23/07/2018']).draw();                
        AtualizarNumeros();
    });

    $("#ed-btn-salvar").click(function(){
        $("#ModalEdit").modal('toggle');
        $("#alert-success").show();
        $("#message-alert").text('Tarefa Atualizada com Sucesso!');
        setTimeout(function(){
           $("#alert-success").hide();
        },2000);
    });
});