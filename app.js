
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let allPlayers = [];
let points = [];

const verticalValues = [0,25,50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475];
const horizontalValues = [0,25,50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475];

const randomVertical = () => verticalValues[ Math.floor(Math.random() * 20)]
const randomHorizontal = () => horizontalValues[Math.floor(Math.random() * 20)]

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    socket.on('loginEmit', user => {
        allPlayers.push(user);
		io.emit('onAddUser', allPlayers);
	});

    socket.on("movePlayersEmit", players => {
        allPlayers = [...players];
        io.emit('onMovePlayers', allPlayers);
    });

    socket.on("createPointsEmit", points => {
        io.emit('onDrawPoints', points);
    });

    socket.on("startEmit", (quantity, current) => {
        points = [];
        createPoints(quantity, current)
    });

    socket.on("clearPlayersEmit", () => {
        io.emit('onClearPlayers', "");
    });

    socket.on("changeQuantityEmit", (quantity) => {
        io.emit('onChangeQuantity', quantity);
    });
    
    socket.on("timeoutEmit", () => {
        io.emit('onTimeout');
    });

    const createPoints = (quantity, current) => {
        const pointsToDraw = JSON.parse(JSON.stringify(current));
        for(let i = 0; i < quantity; i++) {
            const x = randomVertical();
            const y = randomHorizontal();
            pointsToDraw.push({ x, y })
        }
        io.emit('onStart', pointsToDraw);
    }
});

io.on("login", () => {
    console.log("aqui");
})

http.listen(3000, function(){
    console.log('listening on port 3000');
});