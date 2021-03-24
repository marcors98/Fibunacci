const cluster = require('cluster');

console.log(`PID Master: ${process.pid}`);

cluster.setupMaster({
    exec: __dirname + '/servicio-fibonacci.js'
});

cluster.fork();
cluster.fork();

cluster.on('disconnect', (worker) => {
    console.log(`Se desconecto: ${worker.id}`);
}).on('exitt', (worker) => {
    console.log(`Se salio: ${worker.id}`);
    cluster.fork();
}).on('listeninh', (worker, {address, port}) => {
    console.log(`Escuchando: ${address}:${port}`);
    cluster.fork();
});