import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
  template: `<ng-progress></ng-progress><button (click)="fetchData()">Fetch Data</button>`
})
export class ProgressbarComponent {
  @Input() maxValue: number = 100;
  @Input() valueNow: number = 0;

  getPercentage(): number {
    return Math.round((this.valueNow / this.maxValue) * 100);
  }
}
