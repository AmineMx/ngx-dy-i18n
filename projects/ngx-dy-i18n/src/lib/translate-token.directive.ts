import {Directive, Host, Input, OnInit, Optional, SkipSelf} from '@angular/core';
import {DyTranslateService} from './dy-translate.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'dyTranslateToken,[dyTranslateToken]'
})
export class TranslateTokenDirective implements OnInit {
  @Input() value = '';
  @Input() id;

  constructor(private tr: DyTranslateService, @Host() @SkipSelf() @Optional() private translateTokenDirective: TranslateTokenDirective) {

  }

  ngOnInit(): void {
    /**
     * ignore empty id token
     */
    if (this.id === undefined || this.id === '') {
      return;
    }
    this.addToken(this.id, this.value);
  }

  addToken(id: string, value: string) {
    if (this.translateTokenDirective) {
      this.translateTokenDirective.addParent(id, value);
    } else {
      this.tr.addToken(id, value);
    }
  }

  addParent(id: string, value: string) {
    this.addToken(this.id + '.' + id, value);
  }
}
