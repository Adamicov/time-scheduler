import { Component, OnInit } from '@angular/core';
import { Category } from '@models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  defaultCategories: Category[] = [
    {name: 'Work', color: '#6f3e19'},
    {name: 'Sport', color: '#f8d40b'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
