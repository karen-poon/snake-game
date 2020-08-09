// display modal
function showRules() {
    document.getElementsByClassName("modal")[0].style.display = "flex";
}

// close modal when user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == document.getElementsByClassName("modal")[0]) {
        closeModal();
    }
}

// function for closing modal
function closeModal() {
    document.getElementsByClassName("modal")[0].style.display = "none";
}

// disable space and arrow keys for scrolling
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
