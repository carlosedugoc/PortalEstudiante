//// Método que llama todos los eventos del MainJS
function llamarEventosMainJS() {
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
    getElementsHeight();
    viewOptionsUser();
    fixDashboard();
    initItemsResize();
    $('.selectpicker').selectpicker();
}

//// Método para ocultar los botones de guardado y cancelar.
function hideWhenCancel() {
    $(".boxButtonsCenter").fadeOut();
}
/**
 * Esta función es fundamental para que los estilos de masonry y boostrap select no dañen los controles.
 * 
 */
function cambiarPosicionHojaEstilos() {
    /** var cssGeneral = $("#estilos")
     if (cssGeneral != undefined && cssGeneral[0] != undefined) {
         $('#estilos').remove()
         $('head').append(cssGeneral[0])
     }
     */
}

function fixDashboard() {
    var elem = document.querySelector('.grid');
    if (elem != undefined) {
        var msnry = new Masonry(elem, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            horizontalOrder: true
        });
    }
}

function fixToolTip() {
    setTimeout(function () {
        var elements = $('.fa-info-circle').filter('[title!=""]')
        $.each(elements, function (indexInArray, valueOfElement) {
            valueOfElement.setAttribute('data-original-title', valueOfElement.getAttribute('title'))
            valueOfElement.setAttribute('title', '')
        });
    }, 500);
}