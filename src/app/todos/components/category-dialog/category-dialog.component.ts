import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '@models/category';
import { FormBuilder } from '@angular/forms';
import { COLORS } from '../../config';

export interface CategoryDialogData {
  category?: Category | undefined;
}

export const UPDATE = 'Update';
export const SAVE = 'Save';
export const DELETE = 'Delete';

export interface CategoryDialogResponse {
  data: Category;
  action: string;
}


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  category: Category | undefined;
  action: string;
  name: string;
  color: string;
  COLORS = COLORS;
  selectedColor: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: CategoryDialogData
  ) {}

  ngOnInit(): void {
    this.category = this.data.category;
    this.action = this.category ? UPDATE : SAVE;

    const name = this.category?.name;
    const color = this.category?.color;

    this.name = name ? name : '';
    this.selectedColor = color ? color : COLORS[0];
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  submit() {
    const previousCategory: Category | undefined = this.category;
    const category: Category = {
      ...previousCategory,
      name: this.name,
      color: this.selectedColor
    }
    this.dialogRef.close({data: category, action: this.action});
  }

  delete() {
    this.dialogRef.close({data: this.category, action: DELETE})
  }
}
