import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render the toolbar title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    const toolbarTitle = compiled.querySelector('mat-toolbar span');
    expect(toolbarTitle?.textContent).toContain('Local Weather');
  }));

  it('should toggle spinner visibility around answering', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.showSpinner).toBeFalse();
    app.showAnswer();
    expect(app.showSpinner).toBeTrue();

    tick(2000);
    expect(app.showSpinner).toBeFalse();
  }));
});
