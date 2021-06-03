const server = require('./api/server');

const PORT = process.env.PORT || 5000;

// START YOUR SERVER HERE
server.listen(PORT, ()=>console.log(`listening on port ${PORT}`))