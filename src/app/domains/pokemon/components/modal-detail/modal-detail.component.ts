import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Pokemon } from '../../../shared/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { ArrayToStringPipe } from '../../../shared/pipes/array-to-string.pipe';

@Component({
  selector: 'app-modal-detail',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ArrayToStringPipe
  ],
  templateUrl: './modal-detail.component.html',
  styleUrl: './modal-detail.component.css'
})
export class ModalDetailComponent {

  constructor(
    private dialogRef: MatDialogRef<ModalDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pokemon
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
