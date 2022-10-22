export var keyStates = {
    x: 0,
    y: 0,
    space: false
}

window.addEventListener('keydown', (e) => {
    if (e.key == "ArrowLeft") keyStates.x = -1;
    else if(e.key == "ArrowRight") keyStates.x = 1;

    if(e.key == "ArrowUp") keyStates.y = -1;
    else if(e.key == "ArrowDown") keyStates.y = 1;

    if(e.key == " ") keyStates.space = true;
    
});

window.addEventListener('keyup', (e) => {
    if (e.key == "ArrowLeft" || e.key == "ArrowRight") keyStates.x = 0;
    if(e.key == "ArrowUp" || e.key == "ArrowDown") keyStates.y = 0;
    if(e.key == " ") keyStates.space = false;
});