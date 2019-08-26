<h1 align="center" style="border-bottom: none;">📦  ngx-dy-i18n</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/ngx-dy-i18n">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/semantic-release/latest.svg">
  </a>
</p>

**ngx-dy-i18n** simple hack to use translations in controller with native i18n solution, without using other library for i18n(ngx-translate , ...)
it support grouped translations
## Usage
#### 1. Import the `I18NModule`:
You have to import `I18NModule.forRoot()` in the root NgModule of your application.
The [`forRoot`](https://angular.io/api/router/RouterModule#forroot) static method is a convention that provides and configures services at the same time.
Make sure you only call this method in the root module of your application, most of the time called `AppModule`.
```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {I18NModule} from 'ng-dy-i18n';

@NgModule({
    imports: [
        BrowserModule,
        TranslateModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
#### 2. add some translations:
###### 1. Directly in AppComponent using directive
```ts
<dyTranslateToken id="title" value="nice title" i18n-value></dyTranslateToken>
<dyTranslateToken id="errors">
  <dyTranslateToken id="notFound" value="page not found" i18n-value></dyTranslateToken>
  <dyTranslateToken id="unknown" value="unknown error" i18n-value></dyTranslateToken>
</dyTranslateToken>
```

###### 2. Using another component for all translation using component loader
- add new dummy component 
    ```sh
    ng g component I18nTexts
    ```
- add it to entryComponents list
    ```ts
    ...
    entryComponents: [
      I18nTextsComponent
    ]
  ...
    ```
- Inject DyTranslateService in bootstrapped component usually AppComponent
    ```ts
    import {DyTranslateService} from 'ng-dy-i18n';
    ...
    constructor(private tr: DyTranslateService) {}
  ...
    ```
- One time load the translations 
  ```ts
     
    ...
     ngOnInit(): void {
        this.tr.addTranslationFromComponent(I18nTextsComponent);
      }
    ...
    ```
#### 3. Get the translations:
to get the translations you have to use the provided service `DyTranslateService`

```ts
    
    this.tr.get('alert.title').subscribe(value => {
      alert(value)
    });
    
```
    don't forget to unsubscribe to avoid the memory leaks
