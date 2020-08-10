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

// make scoreboard draggable
dragScoreboard();
function dragScoreboard() {
    var pos_x = 0, pos_y = 0;
    var scoreboard = document.getElementsByClassName("scoreboard")[0];

    scoreboard.onmousedown = dragMouseDown;

    // keep track of mouse movement
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos_x = e.clientX;
        pos_y = e.clientY;
        // when mouse is released
        document.onmouseup = stopDragElement;
        // when mouse is moving
        document.onmousemove = elementDrag;
    }

    // drags the scoreboard to a new position
    function elementDrag(e) {
        document.getElementsByClassName("scoreboard")[0].style.cursor = "grabbing";
        e = e || window.event;
        e.preventDefault();
        // get the new cursor position
        pos_x = pos_x - e.clientX;
        pos_y = pos_y - e.clientY;
        // set the scoreboard's new position
        scoreboard.style.top = (scoreboard.offsetTop - pos_y) + "px";
        scoreboard.style.left = (scoreboard.offsetLeft - pos_x) + "px";
        //update position
        pos_x = e.clientX;
        pos_y = e.clientY;
    }

    // stop moving when mouse button is released
    function stopDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.getElementsByClassName("scoreboard")[0].style.cursor = "grab";
    }
}
