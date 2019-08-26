import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {I18NModule} from 'ng-dy-i18n';
import {I18nComponent} from './i18n/i18n.component';

@NgModule({
  declarations: [
    AppComponent,
    I18nComponent
  ],
  imports: [
    BrowserModule,
    I18NModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    I18nComponent
  ]
})
export class AppModule {

}
