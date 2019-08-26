import {TestBed} from '@angular/core/testing';
import {ApplicationRef, ComponentFactoryResolver, Injector} from '@angular/core';
import {DyTranslateService} from './dy-translate.service';
import {take} from "rxjs/operators";


describe('DyTranslateService', () => {
  let service: DyTranslateService
  beforeEach(() => {
    const applicationRefStub = {attachView: hostView => ({})};
    const componentFactoryResolverStub = {
      resolveComponentFactory: component => ({create: () => ({})})
    };
    const injectorStub = {};
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        DyTranslateService,
        {provide: ApplicationRef, useValue: applicationRefStub},
        {
          provide: ComponentFactoryResolver,
          useValue: componentFactoryResolverStub
        },
        {provide: Injector, useValue: injectorStub}
      ]
    });
    service = TestBed.get(DyTranslateService);
  });
  it('can load instance', () => {

    expect(service).toBeTruthy();
  });
  describe('get', () => {
    beforeEach(() => {
      service.addToken('test', 'value');
      service.addToken('testParent.t1', 'test1');
      service.addToken('testParent.t2', 'test2');
      service.addToken('testParent.t3', 'test3');
    });
    it('get right transaction', () => {
      service.get('test').pipe(take(1)).subscribe(v => expect(v).toEqual('value'));
      service.get('test not added').pipe(take(1)).subscribe(v => expect(v).toEqual('test not added'));
      service.get('testParent').pipe(take(1))
        .subscribe(v => expect(v).toEqual(Object({t1: 'test1', t2: 'test2', t3: 'test3'})));
      service.get('testParent.t1').pipe(take(1))
        .subscribe(v => expect(v).toEqual('test1'));
    })
  });
});
