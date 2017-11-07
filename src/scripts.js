//// Método que llama todos los eventos del MainJS
function llamarEventosMainJS()
{
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
}

//// Método para ocultar los botones de guardado y cancelar.
function hideWhenCancel() {
	$(".boxButtonsCenter").fadeOut();
}