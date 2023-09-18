import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breed-info-level-statistics',
  templateUrl: './breed-info-level-statistics.component.html',
  styleUrls: ['./breed-info-level-statistics.component.css']
})
export class BreedInfoLevelStatisticsComponent {
  @Input() title!: string;
  @Input() level!: number;
}
