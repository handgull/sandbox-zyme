import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

console.log(` _______   ____  __ _____ 
|__  /\\ \\ / /  \\/  | ____|
  / /  \\ V /| |\\/| |  _|  
 / /_   | | | |  | | |___ 
/____|  |_| |_|  |_|_____|`);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
