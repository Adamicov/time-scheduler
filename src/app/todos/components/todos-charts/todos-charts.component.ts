import { Component, Input, OnInit } from '@angular/core';
import { ChartCategoriesData, ChartCategoryData } from '@models/chart-category-data';

@Component({
  selector: 'app-todos-charts',
  templateUrl: './todos-charts.component.html',
  styleUrls: ['./todos-charts.component.scss'],
})
export class TodosChartsComponent implements OnInit {
  result: ChartCategoryData[];

  set chartData(data: ChartCategoriesData) {
    this.result = Object.values(data);
    console.log(this.result);
  }

  @Input() data: ChartCategoriesData = {
    Work: {
      label: 'Work',
      name: 'Work',
      value: 7,
      category: {
        id: '1',
        name: 'Work',
        color: '#6f3e19',
      },
    },
    Sport: {
      label: 'Sport',
      name: 'Sport',
      value: 7,
      category: {
        id: '2',
        name: 'Work',
        color: '#f56b06',
      },
    },
  };

  constructor() {
    this.chartData = this.data;
  }

  colorFn = (name: string) => {
    return this.data[name].category.color;
  };

  ngOnInit(): void {}
}
