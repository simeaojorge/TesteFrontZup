import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShotComponent } from './view-shot.component';

describe('ViewShotComponent', () => {
  let component: ViewShotComponent;
  let fixture: ComponentFixture<ViewShotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
