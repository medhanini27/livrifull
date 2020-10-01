import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResteaurantsComponent } from './Resteaurants.component';

describe('ResteaurantsComponent', () => {
    let component: ResteaurantsComponent;
    let fixture: ComponentFixture<ResteaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ResteaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ResteaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
