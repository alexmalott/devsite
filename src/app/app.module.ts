import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import { ResumeModule } from "./resume/resume.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LOCATION_INITIALIZED} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TooltipModule} from "ngx-bootstrap/tooltip";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translate.setDefaultLang('en');
      const langToSet = translate.getBrowserLang()
      translate.use(langToSet ? langToSet : '').subscribe({next: () => {
        console.info(`Successfully initialized '${langToSet}' language.`);
      }, error: err => {
        console.error(`Problem with '${langToSet}' language initialization.`);
        resolve(null)
      }, complete: () => {
        resolve(null);
      }});
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResumeModule,
    HttpClientModule,
    TooltipModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    Title,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
