import {Component, OnInit} from '@angular/core';
import {DyTranslateService} from 'ng-dy-i18n';
import {take} from "rxjs/operators";
import {I18nComponent} from "./i18n/i18n.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-dy-i18n';


  constructor(private tr: DyTranslateService) {

  }

  ngOnInit(): void {
    this.tr.addTranslationFromComponent(I18nComponent);
    this.tr.get('alert.title').pipe(take(1)).subscribe(value => {
      setTimeout(() => {
        alert(value)
      }, 2000)
    });

  }

}
