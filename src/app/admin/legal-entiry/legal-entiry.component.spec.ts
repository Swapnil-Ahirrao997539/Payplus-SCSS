import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEntiryComponent } from './legal-entiry.component';

describe('LegalEntiryComponent', () => {
  let component: LegalEntiryComponent;
  let fixture: ComponentFixture<LegalEntiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalEntiryComponent]
    });
    fixture = TestBed.createComponent(LegalEntiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
