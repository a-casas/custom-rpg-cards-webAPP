//Transforms all the content of a div (e.g. the Card container) into a canvas, generates a preview and allows the user to download it as an image.
//Uses html2canvas script by Niklas von Hertzen https://hertzen.com/ About html2canvas: https://html2canvas.hertzen.com/documentation 

document.addEventListener('DOMContentLoaded', () => {
$(document).ready(function () {


let element = $("#html-content-holder") // global variable
let getCanvas // global variable

$("#btn-Preview-Image").on('click', function () {
    html2canvas(element, {
        onrendered: function (canvas) {
            $("#previewImage").append(canvas)
            getCanvas = canvas
        }
    })
})

$("#btn-Convert-Html2Image").on('click', function () {
    let imgageData = getCanvas.toDataURL("image/jpeg")
    let newData = imgageData.replace(/^data:image\/jpeg/, "data:application/octet-stream")
    $("#btn-Convert-Html2Image").attr("download", "your_RPG_Card.png").attr("href", newData)
})

})

})