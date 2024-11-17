import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatGridListModule } from '@angular/material/grid-list';
import { ArrayToStringPipe } from '../../../shared/pipes/array-to-string.pipe';

import { MatDialog } from '@angular/material/dialog';
import { ModalDetailComponent } from '../modal-detail/modal-detail.component';

import { Pokemon } from '../../../shared/models/pokemon.model';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
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

  addToCartHandeler() {
    console.log('Click from child');
    this.addToCart.emit('Mensaje desde el hijo: ' + this.pokemon.name);
  }

}
