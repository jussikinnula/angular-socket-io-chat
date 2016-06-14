# angular2-socketio-chat-example
An example Angular 2 chat app, made on top of ExpressJS &amp; Socket.io.

## Installation

### Install node modules

```
npm install
```

### Install typings

You need to install `typings` globally, so that you can install the typings easily (alternative is to use `node_modules/typings/dist/typings.js install`):

```
npm install -g typings
typings install
```

## Local development

### Build

```
npm run build
```

### Start web server

```
npm start
```

### Gulp (optional)

The gulp tasks for this project require gulp v4-alpha. If you don't wish to globally install the v4 gulp-cli, you can run the gulp tasks using the locally installed gulp under ./node_modules/.bin — for example:

```
./node_modules/.bin/gulp
```

If you wish, you can also install Gulp globally:

```
npm install -g gulpjs/gulp-cli#4.0
```

After that you can just run:

```
gulp
```

### Open local app in browser

[http://localhost:5000/](http://localhost:5000/)

## Heroku

### Create a Heroku app first (if you don't have already one)

```
heroku create --region eu
```

### Deploy

```
git push heroku origin
```

### Open Heroku app in browser

```
heroku open
```

