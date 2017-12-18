'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const options = {
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, '/')
        }
    }
};

const server = new Hapi.Server();

server.connection(options);

const provision = async () => {

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();
