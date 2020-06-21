import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Todo } from '@models/todo';

export interface ConfirmDeleteData {
  instance: Todo;
  message: string;
}

export interface ConfirmDeleteResponse {
  instance: Todo;
}

@Component({
  selector: 'app-delete-confirm-snackbar',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ConfirmDeleteComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ConfirmDeleteData
  ) {}

  ngOnInit(): void {}

  delete(event: Event): void {
    this.bottomSheetRef.dismiss({ instance: this.data.instance });
    event.preventDefault();
  }
}
