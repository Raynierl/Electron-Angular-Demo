import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenselectComponent } from './screenselect.component';

describe('ScreenselectComponent', () => {
  let component: ScreenselectComponent;
  let fixture: ComponentFixture<ScreenselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
