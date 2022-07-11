require('dotenv').config();
const server = require('./api/server');
const port = process.env.PORT || 3301;

server.listen(
    {
        port: port,
        playground: '/graphql',
        endpoint: '/graphql'
    },
    () => console.log(`🚀 Server is running on localhost:${port}`))

process.on('uncaughtException', (err) => {
    console.error(`${(new Date()).toUTCString()} uncaughtException:`, err);
    process.exit(0);
});

process.on('unhandledRejection', (err) => {
    console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err);
});
