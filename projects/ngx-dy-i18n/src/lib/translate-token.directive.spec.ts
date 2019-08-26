import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {DyTranslateService} from './dy-translate.service';
import {TranslateTokenDirective} from './translate-token.directive';

@Component({
  template: ''
})
class TestComponent {
}

describe('TranslateTokenDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dyTranslateTokenEl: Array<DebugElement>;
  let bareElement: DebugElement;
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [TranslateTokenDirective, TestComponent],
      providers: [DyTranslateService]
    });

  });
  describe('Directive without nested', () => {
    beforeEach(() => {
      fixture = TestBed.overrideComponent(TestComponent, {
        set: {
          template: '<dyTranslateToken id="testID" value="testValue"></dyTranslateToken>'
        }
      })
        .createComponent(TestComponent);


      dyTranslateTokenEl = fixture.debugElement.queryAll(
        By.directive(TranslateTokenDirective)
      );
    });
    it('should have 1 element with directive', () => {
      expect(dyTranslateTokenEl.length).toBe(1);
    });
    describe('ngOnInit', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should get right translation', () => {
        const dyTranslateService: DyTranslateService = TestBed.get(
          DyTranslateService
        );
        dyTranslateService.get('testID').subscribe((value: string) => {
          expect(value).toEqual('testValue');
        })
      });
    })
  });
  describe('nested elements', () => {
    beforeEach(() => {
      fixture = TestBed.overrideComponent(TestComponent, {
        set: {
          template: ` <dyTranslateToken id="testNested">
          <dyTranslateToken id="child0" value="child0-value"></dyTranslateToken>
          <dyTranslateToken id="child1" value="child1-value"></dyTranslateToken>
          <dyTranslateToken id="child2" value="child2-value"></dyTranslateToken>
      </dyTranslateToken>`
        }
      })
        .createComponent(TestComponent);

      fixture.detectChanges();
      dyTranslateTokenEl = fixture.debugElement.queryAll(
        By.directive(TranslateTokenDirective)
      );
    });
    it('should have 4 element with directive', () => {
      expect(dyTranslateTokenEl.length).toBe(4);
    });
    describe('ngOnInit', () => {

      it('should get right translation', () => {
        const dyTranslateService: DyTranslateService = TestBed.get(
          DyTranslateService
        );
        dyTranslateService.get('testNested').subscribe((value: any) => {
          expect(value).toEqual(Object({child0: 'child0-value', child1: 'child1-value', child2: 'child2-value'}));
        })
      });
    })
  });

});
