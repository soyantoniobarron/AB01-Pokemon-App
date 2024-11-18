import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { ModalDetailComponent } from '../modal-detail/modal-detail.component';
// Models
import { Pokemon } from '../../../shared/models/pokemon.model';
// Pipes
import { ArrayToStringPipe } from '../../../shared/pipes/array-to-string.pipe';
// Services
// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-row',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ArrayToStringPipe
  ],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent {
  
  @Input({ required: true }) pokemon: Pokemon = {
    id: 0,
    name: '',
    imgs: {
      artwork: '',
      home: '',
      animated: ''
    },
    types: [],
    weight: '',
    height: '',
    abilities: []
  };

  @Output() addToCart = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ModalDetailComponent, {
      data: this.pokemon
    });
  }

}
