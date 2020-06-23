import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '@models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  {

  @Input() category: Category;
  @Output() categoryClicked = new EventEmitter<Category>();

  onClick() {
    this.categoryClicked.emit(this.category);
  }
}
