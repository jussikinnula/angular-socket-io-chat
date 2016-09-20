# angular2-socketio-chat-example

An example chat application made with Angular 2 and Socket.io (and NodeJS, ExpressJS and MongoDB).

## Highlights

- Angular 2.0.0 final support (with `NgModule` -type of modules)
- Webpack 2 & TypeScript 2
- Styles with [SCSS](http://sass-lang.com/)
- Webpack livereloading (on local development, not HMR but almost as good)
- Full stack compilation on Heroku build process (this is really must to have, should also work on other systems)

Note! This `angular2-socketio-chat-example` should be considered currently as *proof-of-concept*, as currently there's couple of hotfix packages used over the real ones, however, the changes have been already committed to upstream. Also Webpack 2 is currently on beta phase, as well as TypeScript 2 has a lot of pending issues still with types.

## Prequisities

The projects needs that you have the following things installed:

- [NodeJS](https://nodejs.org/) (version 6 or greater, tested with 6.3.1)
- [MongoDB](https://www.mongodb.com/) (tested with version 3.2.6)
- [Heroku Toolbelt](https://toolbelt.heroku.com/) (latest)

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
nvm install v6.3.1
nvm use v6.3.1
```

#### MongoDB

```
brew install mongodb
ln -sf /usr/local/opt/mongodb/homebrew.mxcl.mongodb.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```

Note! You can also unload with `launchctl`, as well as add the load/unload commands to your `.bash_profile` or equivalent as aliases.

### Installing prequisities on Windows

You should install installer packages of [NodeJS](https://nodejs.org/en/download/current/), [MongoDB](https://www.mongodb.com/download-center) and [Heroku Toolbelt](https://toolbelt.heroku.com/windows), either 32bit or 64bit depending on your system.

#### Install some Node modules globally

Windows doesn't add everything to global path, so you might want to install some packages globally (`npm install -g <package>`):

```
npm install -g gulpjs/gulp-cli#4.0
npm install -g webpack
```

#### MongoDB

When MongoDB is installed, you should create (or ensure) that you have `C:\Data` -directory created:

```
dir C:\Data
```

After ensuring or creating the directory, you can just launch MongoDB from command line:

```
mongod.exe
```

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

### Deploy

```
git push heroku master
```

### Open Heroku app in browser

```
heroku open
```

