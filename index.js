let playerName = "Não informei um nome :(";

const verticalValues = [0,25,50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475];

const horizontalValues = [0,25,50,75,100,125,150,175,200];

let ctx;

let velocity = 25;

let pointTime = 2000;

const randomVertical = () => verticalValues[ Math.floor(Math.random() * 19)]

const randomHorizontal = () => horizontalValues[Math.floor(Math.random() * 8)]

let players = [
    { x: randomVertical(), y: randomHorizontal(), w: 25, h: 25, color: "red", points: 10 },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
    { x: randomVertical(), y: randomHorizontal() , w: 25, h: 25, color: "yellow", points: 11, name: "Carlinhos" },
];

let points = [];

window.onpageshow = () => {
    // const playerName  = prompt("Digite o seu nome");
    players[0].name = playerName;

    initialize();
    createPoints();
}

const initialize = () => {
    drawPlayers();
    drawPoints();
    updatePoints();

    requestAnimationFrame(initialize);
}

const createPoints = () => {
    setInterval(() => {
        const x = randomVertical();
        const y = randomHorizontal();
        points.push({ x, y });

        ctx = canvas.getContext("2d");
        ctx.fillStyle = "green";
        ctx.fillRect(x, y, 25, 25);
    }, pointTime)
}

const drawPoints = () => {
    ctx = canvas.getContext("2d");

    points.forEach(point => {
        ctx.fillStyle = "green";
        ctx.fillRect(point.x, point.y, 25, 25);
    });

};

const drawPlayers = () => {
    ctx = canvas.getContext("2d");

    players.forEach(player => {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.h, player.w);
        ctx.moveTo
    });
}

const movePlayer = (player, direction) => {
    ctx.clearRect(player.x, player.y, player.h, player.w);

    if (direction === "ArrowDown"  && player.y < 475) { player.y += velocity; }
    if (direction === "ArrowRight" && player.x < 475) { player.x += velocity; }
    if (direction === "ArrowUp"    && player.y > 0  ) { player.y -= velocity; }
    if (direction === "ArrowLeft"  && player.x > 0  ) { player.x -= velocity; }    

    checkHasPoint();
}

const checkHasPoint = () => {
    const index = points.findIndex(point => point.x === players[0].x && point.y === players[0].y);
    if (index > -1) {
        points.splice(index, 1);
        players[0].points += 1;
    }
}

const updatePoints = () => {
    document.querySelector(".points").innerHTML = "";
    const localPlayers = [...players];
    
    localPlayers.sort((a, b) => {
        if(a.points < b.points) return 1;
        if(a.points > b.points) return -1;
        
        return 0;
    }).forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name}: ${player.points}`

        document.querySelector(".points").appendChild(li)
    });
    
}

window.addEventListener("keydown", ({ key }) => {
    movePlayer(players[0], key);
});
