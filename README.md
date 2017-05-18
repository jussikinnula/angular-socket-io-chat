# angular-socket-io-chat

An example chat application made with Angular and Socket.io (and NodeJS, ExpressJS and MongoDB).

## Highlights

- Angular 4.1.1 or later
- Webpack 2.5.1 or later
- TypeScript 2.3.2 or later
- Styles with [SCSS](http://sass-lang.com/)
- Full stack compilation on Heroku build process

## Prequisities

The projects needs that you have the following things installed:

- [NodeJS](https://nodejs.org/) (version 7 or greater, tested with v7.10.0)
- [MongoDB](https://www.mongodb.com/) (tested with version 3.4.2)
- [Heroku Cli](https://devcenter.heroku.com/articles/heroku-cli) (latest)

All of the prequisities are available on Linux, Windows and Mac OS X systems with their own installers (just go to links above and download package).

### Installing prequisities on Mac OS X

You might wish to install the prequisities with Homebrew, so here're quick guide to do that.

#### Install Homebrew

You can install [Homebrew](http://brew.sh/) with this command:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### NodeJS

You can install NodeJS simply by giving command:

```
brew install node
```

#### Node Version Manager (recommended)

If you wish to run multiple NodeJS versions (to avoid problems with old NodeJS modules, you might want to use 4.2 as default, and NodeJS 6 on newer projects, you should install [NVM](https://github.com/creationix/nvm) (Node Version Manager) for managing multiple NodeJS versions.

NVM can be installed by the following command:

```
brew install nvm
```

Note! Follow the instructions after installing NVM, so that you'll get the shell extended (basically adding stuff to your `.bash_profile`).

Then you can just install and use specific NodeJS version like:

```
nvm install v7
nvm use v7
```

Note! This project is tested currently with NodeJS v7.10.0.

#### Heroku Cli

```
brew install heroku-cli
```

#### MongoDB

```
brew install mongodb
ln -sf /usr/local/opt/mongodb/homebrew.mxcl.mongodb.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```

#### Redis

```
brew install redis
ln -sf /usr/local/opt/redis/homebrew.mxcl.redis.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

### Installing prequisities on Windows

You should install installer packages of [NodeJS](https://nodejs.org/en/download/current/), [MongoDB](https://www.mongodb.com/download-center) and [Heroku Toolbelt](https://toolbelt.heroku.com/windows), either 32bit or 64bit depending on your system.

#### MongoDB

When MongoDB is installed, you should create (or ensure) that you have `C:\Data` -directory created:

```
dir C:\Data
```

After ensuring or creating the directory, you can just launch MongoDB from command line:

```
mongod.exe
```

#### Redis

You could use [Microsoft's port of Redis](https://github.com/MSOpenTech/redis/releases), which provides an easy to use installer.

#### Other notes

On Windows installations, it will ease the task if you use PowerShell and add all the necessary paths to utilities to Windows environment path. To do so, you can right-click the *Start* -button, select *Advanced System Settings* and finally select *Environment Variables*. You need to restart the PowerShell (or possibly logout and login) to get the environment variables going.

## Installation

### Install node modules and type definitions

```
npm install
```

Note! Type definitions were earlier installed with `typings`, however, due switching to TypeScript 2.0 the type definitions are managed with `npm` and more specifically `@types/***` name space.

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

### Continuous development

```
npm run dev
```

This runs Webpack in watch mode, which updates both client and server assets. Server is loaded automatically, client needs manual refreshing. TBD: HMR or livereloading.

## Configuration

- `MONGODB_URI=mongodb://user:pass@hostname:port/database` MongoDB URI (you can leave empty if you use MongoDB on localhost)

For local development, you can save the environment to `.env` -file on project root:

```
MONGODB_URI=mongodb://user:pass@hostname:port/database
```

## Heroku

### Create a Heroku app first (if you don't have already one)

```
heroku create --region eu mycoolapp
```

### Add MongoDB

You can use a free plan of [MongoLab](https://elements.heroku.com/addons/mongolab) for data storage:

```
heroku addons:create mongolab:sandbox
```

### Add Redis

You can use a free plan of [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) for fast memory cache.

```
heroku addons:create heroku-redis:hobby-dev
```

### Deploy

```
git push heroku master
```

### Open Heroku app in browser

```
heroku open
```

