import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';

// root component
import { App } from './client/app/app';

// global styles
import './styles/styles.scss';


if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}


bootstrap(App, [
    ROUTER_PROVIDERS
]).catch((error: Error) => console.error(error));
