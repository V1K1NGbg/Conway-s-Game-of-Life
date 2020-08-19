states = JSON.parse(window.localStorage.getItem("states"));
var alive
var xad, yad, xau, yau;
var add;
var speed = 750;
var speedc = 750;
var started = false;
var width = 1000;
var height = 500;
var arrlenght1 = 100;
var arrlenght2 = 50;
born = new Array(arrlenght1);
create_two_dim_arr(born)
dead = new Array(arrlenght1);
create_two_dim_arr(dead)
if (!states) {
    reset();
}

function speedfunction() {
    speed = document.getElementById("speedvalue").textContent;
    speed = 1000 - speed + 1;
    if (speed != speedc) {
        speedc = speed;
        if (started) {
            clearInterval(add);
            started = false
            start();
        }
    }
}

function reset() {
    states = new Array(arrlenght1);
    create_two_dim_arr(states);
    save();
    draw();
}

function create_two_dim_arr(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(arrlenght2);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j <= arrlenght2; j++) {
            arr[i][j] = false;
        }
    }
}

function save() {
    window.localStorage.setItem("states", JSON.stringify(states));
}


function drawgrid() {

    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        for (var x = 0.5; x < width; x += 10) {
            context.moveTo(x, 0);
            context.lineTo(x, height);
        }

        for (var y = 0.5; y < height; y += 10) {
            context.moveTo(0, y);
            context.lineTo(width, y);
        }
        context.strokeStyle = 'grey';
        context.stroke();
        draw()

    }
}

function draw() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    for (let i = 0; i < states.length; i++) {
        for (let j = 0; j <= states.length; j++) {
            if (states[i][j]) {
                context.fillStyle = "#000000";
                context.fillRect((i * 10) + 1, (j * 10) + 1, 9, 9);
            }
            else {
                context.fillStyle = "#FFFFFF";
                context.fillRect((i * 10) + 1, (j * 10) + 1, 9, 9);
            }
        }
    }
}

function preset1() {
    reset();
    fetch('patern1.json')
        .then(response => response.json())
        .then(data => {
            states = data;
            save();
            draw();
        });

}
function preset2() {
    reset();
    fetch('patern2.json')
        .then(response => response.json())
        .then(data => {
            states = data;
            save();
            draw();
        });

}
function preset3() {
    reset();
    fetch('patern3.json')
        .then(response => response.json())
        .then(data => {
            states = data;
            save();
            draw();
        });
}
function preset4() {
    reset();
    fetch('patern4.json')
        .then(response => response.json())
        .then(data => {
            states = data;
            save();
            draw();
        });

}
function random() {
    reset();
    for (let i = 0; i < states.length; i++) {
        for (let j = 0; j < arrlenght2; j++) {
            states[i][j] = Math.random() >= 0.5;
        }
    }
    save();
    draw();
}

function Click(event) {
    var x = event.clientX - 10;
    var y = event.clientY - 10;
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    if (states[x][y] == false) {
        states[x][y] = true;
        draw();
    } else {
        states[x][y] = false;
        draw();
    }
    save();
}
function live(x, y) {
    alive = 0;
    xau = true;
    yau = true;
    xad = true;
    yad = true;
    if (x == 0) {
        xau = false
    }
    if (x == states.length - 1) {
        xad = false
    }
    if (y == 0) {
        yau = false
    }
    if (y == states.length - 1) {
        yad = false
    }
    if (xau && yau && states[x - 1][y - 1]) {
        alive = alive + 1;
    }
    if (yau && states[x][y - 1]) {
        alive = alive + 1;
    }
    if (xad && yau && states[x + 1][y - 1]) {
        alive = alive + 1;
    }
    if (xau && states[x - 1][y]) {
        alive = alive + 1;
    }
    if (xad && states[x + 1][y]) {
        alive = alive + 1;
    }
    if (xau && yad && states[x - 1][y + 1]) {
        alive = alive + 1;
    }
    if (yad && states[x][y + 1]) {
        alive = alive + 1;
    }
    if (xad && yad && states[x + 1][y + 1]) {
        alive = alive + 1;
    }
}
function exe() {
    for (let i = 0; i < born.length; i++) {
        for (let j = 0; j < arrlenght2; j++) {
            if (born[i][j]) {
                states[i][j] = true
                born[i][j] = false
            }
            if (dead[i][j]) {
                states[i][j] = false
                dead[i][j] = false
            }
        }
    }
}

function start() {
    if (started == false) {
        started = true
        add = setInterval(function () {
            for (let i = 0; i < states.length; i++) {
                for (let j = 0; j < arrlenght2; j++) {
                    live(i, j);
                    if (alive == 3 && states[i][j] == false) {
                        born[i][j] = true;
                    } else if ((alive > 3 || alive < 2) && states[i][j]) {
                        dead[i][j] = true;
                    }
                }
            }
            exe();
            save();
            draw();
            speedfunction()
        }, speedc);
    }
}