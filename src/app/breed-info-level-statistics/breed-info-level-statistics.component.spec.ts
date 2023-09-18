import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedInfoLevelStatisticsComponent } from './breed-info-level-statistics.component';

describe('BreedInfoLevelStatisticsComponent', () => {
  let component: BreedInfoLevelStatisticsComponent;
  let fixture: ComponentFixture<BreedInfoLevelStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreedInfoLevelStatisticsComponent]
    });
    fixture = TestBed.createComponent(BreedInfoLevelStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
