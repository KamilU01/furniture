import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWithParamsComponent } from './search-with-params.component';

describe('SearchWithParamsComponent', () => {
  let component: SearchWithParamsComponent;
  let fixture: ComponentFixture<SearchWithParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchWithParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWithParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
