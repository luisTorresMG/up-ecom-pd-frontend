import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
//new imports
import { ReactiveFormsModule } from '@angular/forms';
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');

bootstrapApplication(AppComponent,
  //  appConfig
  {
  providers: [
    { provide: ReactiveFormsModule, 
      useClass: ReactiveFormsModule },
    ...appConfig.providers
  ]
}
)
.catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
