const loader = document.querySelector(".loader-wrapper")

window.addEventListener("load", setTimeout(loaderDis, 1025))

function loaderDis(){
    loader.style.display = "none"
}