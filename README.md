# angular2-socketio-chat-example
An example Angular 2 chat app, made on top of ExpressJS &amp; Socket.io.

NOTE! The app currently is tested only to work with *Angular 2 RC2*. It should work at least with RC4 without any significant changes, however, with RC5 and RC6 there would be greater need of refactoring.

## Prequisities

The projects needs that you have the following things installed:

- [NodeJS](https://nodejs.org/) (version 5 or greater, tested with 6.3.1)
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

If you wish to run multiple NodeJS versions (to avoid problems with old NodeJS modules, you might want to use 4.2 as default, and NodeJS 5 on newer projects and even try NodeJS 6), you should install [NVM](https://github.com/creationix/nvm) (Node Version Manager) for managing multiple NodeJS versions.

NVM can be installed by the following command:

```
brew install nvm
```

Note! Follow the instructions after installing NVM, so that you'll get the shell extended (basically adding stuff to your `.bash_profile`).

Then you can just install and use specific NodeJS version like:

```
nvm install v6.3.1
nvm use v6.3.1
nvm alias default v6.3.1
```

#### MongoDB

```
brew install mongodb
ln -sf /usr/local/opt/mongodb/homebrew.mxcl.mongodb.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```

Note! You can also unload with `launchctl`, as well as add the load/unload commands to your `.bash_profile` or equivalent as aliases.

## Installation

### Install node modules

```
npm install
```

Note! Typings are automatically installed along with the `npm install`.

#### Install typings globally (optional)

If you wish to add more typings easily you can install `typings` npm package globally with the following command:

```
npm install -g typings
```

After that you can install more typings for packages with `typings install <package> --save` or with `--global` or global (formerly _ambient_ typings).

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

### Add MongoDB

You can use a free plan of [MongoLab](https://elements.heroku.com/addons/mongolab) for data storage:

```
heroku addons:create mongolab:sandbox
```

### Deploy

```
git push heroku origin
```

### Open Heroku app in browser

```
heroku open
```

