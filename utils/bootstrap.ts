import { Application } from "express";
import { Server } from 'http';

let server: Server;

const bootstrap = async (app: Application) => {
    try {
        server = app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log('Failed Server!', err);
    }

    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

export default bootstrap;