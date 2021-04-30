import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApidemoComponent } from './apidemo.component';

describe('ApidemoComponent', () => {
  let component: ApidemoComponent;
  let fixture: ComponentFixture<ApidemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApidemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApidemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
