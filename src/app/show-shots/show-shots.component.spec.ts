import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowShotsComponent } from './show-shots.component';

describe('ShowShotsComponent', () => {
  let component: ShowShotsComponent;
  let fixture: ComponentFixture<ShowShotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowShotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowShotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
