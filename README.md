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

