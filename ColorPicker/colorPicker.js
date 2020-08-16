const btnRGB = document.getElementById("btnRGB");
const btnHex = document.getElementById("btnHex");
const body = document.getElementById("body")
const span = document.getElementById("bgColor")
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + 1;
}

btnHex.addEventListener("click", () => {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // 16^6 - 1 = 16777215
    bgColor.textContent = randomColor;
    body.style = "background-color:" + randomColor;
})


btnRGB.addEventListener("click", () => {
    bgColor.textContent = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")"
    body.style = "background-color:rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")"
})