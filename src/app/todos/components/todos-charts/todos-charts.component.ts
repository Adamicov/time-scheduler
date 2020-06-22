import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { createNgxChartsDataFromTodosAmount, NgxChartsData, TodosAmountData } from '@models/chart-category-data';

@Component({
  selector: 'app-todos-charts',
  templateUrl: './todos-charts.component.html',
  styleUrls: ['./todos-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosChartsComponent implements OnInit, OnChanges {
  @Input() data: TodosAmountData;

  results: NgxChartsData[];
  colorFn = (name: string) => this.data[name].category.color;

  set chartData(data: TodosAmountData) {
    this.results = [...createNgxChartsDataFromTodosAmount(data)];
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.chartData = this.data;
  }
}
