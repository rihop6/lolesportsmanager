import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamliComponent } from './teamli.component';

describe('TeamliComponent', () => {
  let component: TeamliComponent;
  let fixture: ComponentFixture<TeamliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
