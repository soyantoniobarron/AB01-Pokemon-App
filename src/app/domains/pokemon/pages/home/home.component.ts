import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
// Components
import { RowComponent } from '../../components/row/row.component';
// Models
import { Pokemon, Ability, Type } from './../../../shared/models/pokemon.model';
// Services
import { PokemonService } from '../../../shared/services/pokemon.service';
// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RowComponent,
    FormsModule,
    MatPaginatorModule,
    MatPaginator,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  pokemonList = signal<Pokemon[]>([]);
  pokemonPage = signal<Pokemon[]>([]);
  searchList = signal<Pokemon[]>([]);

  pageError = signal(false);
  errorTitle = signal('');

  listLength = signal(0);
  pageSize = signal(36);
  pageIndex = signal(0);
  pageOffset = signal(0);

  private pokemonService = inject(PokemonService);

  ngOnInit() {
    this.savePokemonLists();
  }

  savePokemonLists() {
    this.pokemonService.getPokemonList(-1, 0).subscribe({
      next: (dataList: any) => {
        const results = dataList.results;
        this.listLength.set(results.length);
        results.forEach((pokemon: any) => {
          this.getPokemonDetails(pokemon);
        });
      },
      error: err => {
        this.pageError.set(true);
        this.errorTitle.set('Server error. Please try again later.');
      },
    });
  }

  getPokemonDetails(pokemon: any) {
    this.pokemonService.getPokemonDetails(pokemon.name).subscribe({
      next: (dataDetails: any) => {
        const newPokemon = {
          id: dataDetails.id,
          name: dataDetails.name,
          imgs: {
            artwork: dataDetails.sprites.other['official-artwork'].front_default,
            home: dataDetails.sprites.other.home.front_default,
            animated: dataDetails.sprites.other.showdown.front_default
          },
          types: dataDetails.types.map((type: Type) => type.type.name),
          weight: dataDetails.height,
          height: dataDetails.weight,
          abilities: dataDetails.abilities.map((ability: Ability) => ability.ability.name),
        };
        this.pokemonList.update((pokemonList) => {
          return this.addPokemonToList(pokemonList, newPokemon);
        });
        this.searchList.update((pokemonList) => {
          return this.addPokemonToList(pokemonList, newPokemon);
        });
        if (newPokemon.id <= this.pageSize()) {
          this.pokemonPage.update((pokemonList) => {
            return this.addPokemonToList(pokemonList, newPokemon);
          });
        }
      },
      error: err => {
        this.pageError.set(true);
        this.errorTitle.set('Server error. Please try again later.');
      },
    });
  }

  addPokemonToList(pokemonList: any, newPokemon: any) {
    const newList = [...pokemonList];
    const index = newList.findIndex(pokemon => pokemon.id > newPokemon.id);
    if (index === -1) {
      newList.push(newPokemon);
    } else {
      newList.splice(index, 0, newPokemon);
    }
    return newList;
  }

  getPokemonPage() {
    if (this.listLength() === 0) {
      this.listLength.set(this.pokemonList().length);
    }
    const list = (this.pokemonList().length === this.searchList().length) ? this.pokemonList() : this.searchList();
    const pageResults = list.slice(this.pageOffset(), this.pageOffset() + this.pageSize());
    this.pokemonPage.update(() => pageResults);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.pageOffset.set(event.pageIndex * event.pageSize);
    this.getPokemonPage();
  }

  searchHandler(event: Event) {
    // Clear ofset & length
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const results = this.pokemonList().filter(item =>
      item.id == parseInt(value) ||
      item.name.includes(value.toLowerCase()) ||
      item.weight == value ||
      item.types.some((type: any) => type.includes(value.toLowerCase())) ||
      item.abilities.some((ability: any) => ability.includes(value.toLowerCase()))
    );
    this.searchList.update(() => results);
    this.getPokemonPage();
    // Set Paginator Data
    this.listLength.set(results.length);
    this.pageIndex.set(0);
    this.pageOffset.set(0);
    this.paginator.pageIndex = 0;
    this.pageError.set(!results.length);
    if (!results.length) {
      this.errorTitle.set('No results.');
    }
  }
}
