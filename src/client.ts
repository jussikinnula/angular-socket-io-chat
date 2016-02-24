import { enableProdMode, provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { APP_BASE_HREF, ROUTER_PROVIDERS } from 'angular2/router';

// root component
import { App } from './client/app/app';

// global styles
import './styles/styles.scss';


if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}


bootstrap(App, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'})
]).catch((error: Error) => console.error(error));
