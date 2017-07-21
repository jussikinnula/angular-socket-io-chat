import * as express from 'express';
import * as http from 'http';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as socket from 'socket.io';
import * as mongoose from 'mongoose';
import * as redis from 'socket.io-redis';

import { RoomSocket } from './socket';

declare var process, __dirname;

export class Backend {
  private app: express.Application;
  private server: any;
  private io: any;
  private mongo: mongoose.MongooseThenable;
  private port: number;

  constructor() {
    // Create expressjs application
    this.app = express();

    // Setup routes
    this.routes();

    // Create server
    this.server = http.createServer(this.app);

    // Create database connections
    this.databases();

    // Handle websockets
    this.sockets();
  }

  // Configure routes
  private routes(): void {
    // Setup router
    let router: express.Router;
    router = express.Router();

    // Root path
    const root = path.join(path.resolve(__dirname, '../../target'));

    // Static assets
    this.app.use('/assets', serveStatic(path.resolve(root, 'assets')));

    // Set router to serve index.html (e.g. single page app)
    router.get('/', (request: express.Request, result: express.Response) => {
      result.sendFile(path.join(root, '/index.html'));
    });

    // Set app to use router as the default route
    this.app.use('*', router);
  }

  // Configure databases
  private databases(): void {
    // MongoDB URL
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chat';

    // Get MongoDB handle
    this.mongo = mongoose.connect(MONGODB_URI, { useMongoClient: true });
    (<any>mongoose).Promise = global.Promise;
  }

  // Configure sockets
  private sockets(): void {
    // Get socket.io handle
    this.io = socket(this.server);

    // Set Redis adapter
    const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
    this.io.adapter(redis(REDIS_URL));

    // Set room socket
    let roomSocket = new RoomSocket(this.io);
  }

  public listen(): void {
    // Get port
    const port = process.env.PORT || 5000;

    // Start listening
    this.server.listen(port);

    // add error handler
    this.server.on('error', error => {
      console.log('ERROR', error);
    });

    // start listening on port
    this.server.on('listening', () => {
      console.log(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    });
  }
}