import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateTokenDirective} from './lib/translate-token.directive';
import {DyTranslateService} from './lib/dy-translate.service';


export * from './lib/translate-token.directive';
export * from './lib/dy-translate.service';


@NgModule({
  declarations: [TranslateTokenDirective],
  imports: [
    CommonModule
  ],
  exports: [TranslateTokenDirective]
})
export class I18NModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18NModule,
      providers: [DyTranslateService]
    };
  }
}
