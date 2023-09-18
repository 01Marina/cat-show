import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breed-info-true-or-false-statistics',
  templateUrl: './breed-info-true-or-false-statistics.component.html',
  styleUrls: ['./breed-info-true-or-false-statistics.component.css']
})
export class BreedInfoTrueOrFalseStatisticsComponent {
  @Input() title!: string;
  @Input() value!: number;
}
