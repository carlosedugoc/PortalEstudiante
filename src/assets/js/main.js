$(document).ready(function(){
	mainNavToogle();
	checkItems();
	gridMasonryDashboard();
	rotate180();
	activeForParentAcordion();
	inputFileClear();
	appearWhenChange();
});


var hideClases =".name, .carrer, .seccionPadre li span, .menu .collapse";

function mainNavToogle(){
  $('.navicon-button.rarr').click(function(){
		var nav = "#mainNav";
		var content = "#content";
		var navState = $(nav).hasClass('hideNav');
		var contentState = $(content).hasClass('expandContent');
		if(contentState == false && navState == false){
			$(nav).addClass('hideNav');
			$(content).addClass('expandContent');
			$(this).addClass('openMenu');
			$(hideClases).addClass("hideElement");
			$(".seccionPadre li").addClass("text-center");
			inerMenu();
	    }else{
			$(nav).removeClass('hideNav');
			$(content).removeClass('expandContent');
			$(this).removeClass('openMenu');
			$(hideClases).removeClass("hideElement");
			$(".miga").removeClass("bordeL")
			$(".seccionPadre li").removeClass("text-center");
	    }
	});
}

function inerMenu(){
$('.seccionPadre').click(function(){
    var state = $('#mainNav').hasClass('hideNav');
    	if(state == true){
			$('#mainNav').removeClass('hideNav');
			$('#content').removeClass('expandContent');
			$('.seccionPadre li').removeClass('text-center');
			$('#mainNav').find(hideClases).removeClass('hideElement');
			$('.navicon-button.rarr').removeClass('openMenu');
    	}
});
}

function checkItems(){
	$('a.checkAll').click(function(event){
    $(event.target).closest('tr').find('.boxCheckbox input[type=checkbox]:not([disabled])').prop('checked', true);
	});
	$('a.uncheckAll').click(function(event){
    $(event.target).closest('tr').find('.boxCheckbox input[type=checkbox]:not([disabled])').prop('checked', false);
	});
	$('.boxSwitch input[type=checkbox]').click(function(event){
	   $(event.target).closest('tr').find('.boxCheckbox input[type=checkbox], .boxInput input').prop('disabled', !$(event.target).is(':checked') );
	});
}

function gridMasonryDashboard(){
	$('.grid').masonry({
	  itemSelector: '.grid-item',
	  columnWidth: '.grid-sizer',
	  percentPosition: true,
	  // horizontalOrder: true
	});
}

function rotate180(){

	$('a.accordionHijo').click(function(event){
		var panel = $(this).closest("ul.panel");
		var icono = $(this).find("i");

		if( $(icono).hasClass("rotate180") ) {
			$(panel).find("a.accordionHijo i.rotate180").removeClass("rotate180");
		} else {
			$(panel).find("a.accordionHijo i.rotate180").removeClass("rotate180");
			$(icono).addClass('rotate180');
		}
	});
}

function activeForParentAcordion(){
	$(".seccionPadre").click(function(){
    $(this).closest('.panel').find('.seccionPadre').removeClass('active');
   	$(this).addClass('active');
 	});
}

function inputFileClear(){
	// Set the clear onclick function
    $('.image-preview-clear').click(function(){
        $('#modal-clear').modal('show');
    });
    // Evento del boton de confirmación para eliminar
    $('.modal-footer .btnFirstAccion').click(function(){
        clearFile();
    });
    //Evento que se ejecuta cada que suben un archivo
	$(".image-preview-input input:file").change(function (){		
		var file = this.files[0];
		if (file != undefined)
		{
			var reader = new FileReader();
			reader.onload = function (e) {
				$(".image-preview-clear").show();
				$(".image-preview-input").hide();
				$('.image-preview-clear').show();
				$(".image-preview-input-2").addClass("inlineBlock");
				$(".image-preview-filename").val(file.name);
			}   
			reader.readAsDataURL(file);
		}
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
	$(".inputCanChange").on('input', function (){
		fadeWhenChange();
	});
	$(".inputFileCanChange").change( function (){
		fadeWhenChange();
	});
}

function fadeWhenChange() {
	$(".boxButtonsCenter").fadeIn();
}