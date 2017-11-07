$(document).ready(function() {
    mainNavToogle();
    checkItems();
    gridMasonryDashboard();
    rotate180();
    activeForParentAcordion();
    inputFileClear();
    appearWhenChange();
    newInputs();
    valideLogin();
    showAndHidePassword();
    changeIconsOnHeaderAndTooltips();
    closeMessageInfo();
});


var hideClases = ".name, .carrer, .seccionPadre li span, .menu .collapse";

function mainNavToogle() {
    $('.navicon-button.rarr').click(function() {
        var nav = "#mainNav";
        var content = "#content";
        var navState = $(nav).hasClass('hideNav');
        var contentState = $(content).hasClass('expandContent');
        if (contentState == false && navState == false) {
            $(nav).addClass('hideNav');
            $(content).addClass('expandContent');
            $(this).addClass('openMenu');
            $(hideClases).addClass("hideElement");
            $(".seccionPadre li").addClass("text-center");
            inerMenu();
        } else {
            $(nav).removeClass('hideNav');
            $(content).removeClass('expandContent');
            $(this).removeClass('openMenu');
            $(hideClases).removeClass("hideElement");
            $(".miga").removeClass("bordeL")
            $(".seccionPadre li").removeClass("text-center");
        }
    });
}

function inerMenu() {
    $('.seccionPadre').click(function() {
        var state = $('#mainNav').hasClass('hideNav');
        if (state == true) {
            $('#mainNav').removeClass('hideNav');
            $('#content').removeClass('expandContent');
            $('.seccionPadre li').removeClass('text-center');
            $('#mainNav').find(hideClases).removeClass('hideElement');
            $('.navicon-button.rarr').removeClass('openMenu');
        }
    });
}

function checkItems() {
    $('a.checkAll').click(function(event) {
        $(event.target).closest('tr').find('.boxCheckbox input[type=checkbox]:not([disabled])').prop('checked', true);
    });
    $('a.uncheckAll').click(function(event) {
        $(event.target).closest('tr').find('.boxCheckbox input[type=checkbox]:not([disabled])').prop('checked', false);
    });
    $('.boxSwitch input[type=checkbox]').click(function(event) {
        $(event.target).closest('tr').find('.boxCheckbox input[type=checkbox], .boxInput input, .boxInputName input').prop('disabled', !$(event.target).is(':checked'));
    });
}

function gridMasonryDashboard() {
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        // horizontalOrder: true
    });
}

function rotate180() {

    $('a.accordionHijo').click(function(event) {
        var panel = $(this).closest("ul.panel");
        var icono = $(this).find("i");

        if ($(icono).hasClass("rotate180")) {
            $(panel).find("a.accordionHijo i.rotate180").removeClass("rotate180");
        } else {
            $(panel).find("a.accordionHijo i.rotate180").removeClass("rotate180");
            $(icono).addClass('rotate180');
        }
    });
}

function activeForParentAcordion() {
    $(".seccionPadre").click(function() {
        $(this).closest('.panel').find('.seccionPadre').removeClass('active');
        $(this).addClass('active');
    });
}

function inputFileClear() {
    // Set the clear onclick function
    $('.image-preview-clear').click(function() {
        $('#modal-clear').modal('show');
    });
    // Evento del boton de confirmación para eliminar
    $('.modal-footer .btnFirstAccion').click(function() {
        clearFile();
    });
    //Evento que se ejecuta cada que suben un archivo
    $(".image-preview-input input:file").change(function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            $(".image-preview-clear").show();
            $(".image-preview-input").hide();
            $(".image-preview-input-2").addClass("inlineBlock");
            $(".image-preview-filename").val(file.name);
        }
        reader.readAsDataURL(file);
    });
}


//Limpia el campo File
function clearFile() {
    $('.image-preview-filename').val("");
    $('.image-preview-clear').hide();
    $('.image-preview-input input:file').val("");
    $(".image-preview-input").show();
    $(".image-preview-input-2").removeClass("inlineBlock");
}


function appearWhenChange() {
    $(".inputCanChange").on('input', function() {
        fadeWhenChange();
    });
    $(".inputFileCanChange, .switchCanChange").change(function() {
        fadeWhenChange();
    });

}

function fadeWhenChange() {
    $(".boxButtonsCenter").fadeIn();
}

function newInputs() {
    $('.makeNewRow').click(function() {
        var table = $('#newUniversitiesTable tbody');
        var row = $(table).find('tr:last-child').clone();
        $(row).appendTo(table);
        $(row).find('input').val('').prop({ disabled: false, checked: true });
        checkItems();
        appearWhenChange();
    });
}

function valideLogin() {
    $("#submitLogin").click(function(event) {

        if ( $.trim($("#passwordLogin").val()) == "") {
            event.preventDefault();
            $("#passwordLogin").addClass("warningInputs");
            $("#showPassword").addClass("warningInputs");
            $("#passwordLogin").attr("placeholder", "Por favor ingresa tu contraseña");
        }
        
        if ($.trim($("#userLogin").val()) == "" ) {
            event.preventDefault();
            $("#userLogin").addClass("warningInputs");
            $("#userLogin").attr("placeholder", "Por favor ingresar tu usuario");
        }
       
    });
}

function showAndHidePassword() {
    $("#showPassword").click(function(event) {
        event.preventDefault();
        $("#showPassword i").toggleClass("fa-eye-slash fa-eye");
        if ($("#passwordLogin").is(":password")) {
            $("#passwordLogin").prop("type", "text");
        } else {
            $("#passwordLogin").prop("type", "password");
        }
    });
}

function changeIconsOnHeaderAndTooltips() {
    $("#notifacionesIcon").hover(function(event) {
        $("#notifacionesIcon i").toggleClass("fa-bell-o fa-bell");
    });
    $("#mensajesIcon").hover(function(event) {
        $("#mensajesIcon i").toggleClass("fa-envelope-o fa-envelope");
    });
    $('[data-toggle="tooltip"]').tooltip(); 
}

function closeMessageInfo() {
    $(".cerrarMessage").click(function(event) {
        $(".messageInfo").fadeOut();
    });
}