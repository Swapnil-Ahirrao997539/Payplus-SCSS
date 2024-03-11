import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServletExceptionComponent } from './servlet-exception.component';

describe('ServletExceptionComponent', () => {
  let component: ServletExceptionComponent;
  let fixture: ComponentFixture<ServletExceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServletExceptionComponent]
    });
    fixture = TestBed.createComponent(ServletExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
