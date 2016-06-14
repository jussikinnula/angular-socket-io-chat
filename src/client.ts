import { enableProdMode, provide } from "@angular/core";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { ROUTER_PROVIDERS } from "@angular/router-deprecated";

// root component
import { AppComponent } from "./client/app";

// service providers
import { SERVICE_PROVIDERS } from "./client/services/providers"

// global styles
import "./styles/styles.scss";


if (process.env.NODE_ENV === "production") {
    enableProdMode();
}


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    SERVICE_PROVIDERS
]).catch((error: Error) => console.error(error));
