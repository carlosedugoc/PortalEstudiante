$(document).ready(function(){
	mainNavToogle();
	checkItems();
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