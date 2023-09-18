import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedInfoTrueOrFalseStatisticsComponent } from './breed-info-true-or-false-statistics.component';

describe('BreedInfoTrueOrFalseStatisticsComponent', () => {
  let component: BreedInfoTrueOrFalseStatisticsComponent;
  let fixture: ComponentFixture<BreedInfoTrueOrFalseStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreedInfoTrueOrFalseStatisticsComponent]
    });
    fixture = TestBed.createComponent(BreedInfoTrueOrFalseStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
