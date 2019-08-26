import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class DyTranslateService {
  private store: BehaviorSubject<{ [key: string]: string }> = new BehaviorSubject({});
  private store$ = this.store.asObservable();

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private applicationRef: ApplicationRef) {

  }

  /**
   * extract string tokens from component,
   * this method will load and destroy in memory without inject it in change tree of angular or in dom
   * the component must be in entryComponents
   */
  addTranslationFromComponent(component) {
    const componentFactory = this.resolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    componentRef.hostView.detectChanges();
    setTimeout(() => {
      componentRef.destroy();
    });
  }

  /**
   * Gets the translated value of a key
   * @returns the translated key, or an object of translated keys
   */
  get(token: string): Observable<string | any> {
    return this.store$.pipe(map(x => this.getTranslation(token.trim(), x)));
  }

  /**
   * get static translation
   */
  getStatic(token: string | Array<string>): string | any {
    const store = this.store.getValue();
    return this.getTranslation(token, store);
  }

  addToken(token: string, value: string) {
    const tr = this.store.getValue();
    tr[token] = value;
    this.store.next(tr);
  }

  private getTranslation(token, store) {
    let tokens = Object.keys(store).filter(e =>
      e.startsWith(token + '.') || token === e
    );
    if (tokens.length > 1) {
      tokens = tokens.filter(x => x !== token);
      return tokens.reduce((obj, key) => {
        return Object.assign(obj, {[key.replace(token + '.', '')]: store[key.toString()] || key})
      }, {});
    }
    return store[token as string] || token;
  }
}
