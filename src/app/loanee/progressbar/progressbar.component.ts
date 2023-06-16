import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
  template: `
    <div class="progress">
      <div class="progress-bar" role="progressbar" [style.width.%]="getPercentage()" [attr.aria-valuenow]="valueNow" [attr.aria-valuemin]="0" [attr.aria-valuemax]="maxValue">
        {{ getPercentage() }}%
      </div>
    </div>
  `
})
export class ProgressbarComponent {
  @Input() maxValue: number = 100;
  @Input() valueNow: number = 0;

  getPercentage(): number {
    return Math.round((this.valueNow / this.maxValue) * 100);
  }
}
