import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// root component
import { AppModule } from "./app/app.module";

// global styles
import "./styles/styles.scss";

// Declare process variable (so that type checker doesn't nag about it)
declare var process;

if (process.env.NODE_ENV === "production") {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);