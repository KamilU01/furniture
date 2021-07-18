import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangmentComponent } from './arrangment.component';

describe('ArrangmentComponent', () => {
  let component: ArrangmentComponent;
  let fixture: ComponentFixture<ArrangmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrangmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
