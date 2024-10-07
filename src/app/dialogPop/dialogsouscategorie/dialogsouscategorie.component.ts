import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogsouscategorie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialogsouscategorie.component.html',
  styleUrl: './dialogsouscategorie.component.scss'
})
export class DialogsouscategorieComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogsouscategorieComponent>
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }
}
