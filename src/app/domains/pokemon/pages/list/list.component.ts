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
  selector: 'app-list',
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
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  pokemonList= signal<any[]>([]);
  pokemonPage = signal<Pokemon[]>([]);
  searchList= signal<any[]>([]);
  typeList = signal<any[]>([]);

  pageLength = signal(0);
  pageSize = signal(36);
  pageIndex = signal(0);
  pageOffset = signal(0);

  fromChild(event: string) {
    console.log('Estamos en el padre');
    console.log(event);
  }

  private pokemonService = inject(PokemonService);

  ngOnInit() {
    this.savePokemonList();
    
    this.getPokemonTypes();
  }

  savePokemonList() {
    this.pokemonService.getPokemonList(-1, 0).subscribe({
      next: (dataList: any) => {
        const results = dataList.results;
        this.pokemonList.update(() => results);
        this.searchList.update(() => results);
        this.getPokemonPage();
      }
    });
  }

  getPokemonPage() {
    this.clearPokemonPage();
    if (this.pageLength() === 0) {
      this.pageLength.set(this.pokemonList().length);
    }
    // Code using local data
    const list = (this.pokemonList().length === this.searchList().length) ? this.pokemonList() : this.searchList();
    const pageResults = list.slice(this.pageOffset(), this.pageOffset() + this.pageSize());
    // console.log(this.pageOffset());
    // console.log(this.pageSize());
    // console.log(this.pokemonList());
    // console.log(pageResults);
    pageResults.forEach((item: any) => {
      this.getPokemonDetails(item.name);
    });
    // Code using API with pageSize && pageOffset
    // this.pokemonService.getPokemonList(this.pageSize(), this.pageOffset()).subscribe({
    //   next: (dataList: any) => {
    //     if (this.pageLength() === 0) {
    //       this.pageLength.set(dataList.count);
    //     }
    //     dataList.results.forEach((item: any) => {
    //       this.getPokemonDetails(item.name);
    //     });
    //   }
    // });
  }

  clearPokemonPage() {
    if (this.pokemonPage().length > 0) {
      this.pokemonPage.update(() => []);
    }
  }

  getPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe({
      next: (dataList: any) => {
        this.typeList.update(() => dataList.results);
        // console.log(this.typeList());
      }
    })
  }

  getPokemonListByType(typeURL: string) {
    this.clearPokemonPage();
    console.log(typeURL);
    this.pokemonService.getPokemonListByType(typeURL).subscribe({
      next: (dataList: any) => {
        console.log(dataList);
        if (this.pageLength() === 0) {
          this.pageLength.set(dataList.count);
        }
        dataList.pokemon.forEach((item: any) => {
          console.log(item);
          this.getPokemonDetails(item.pokemon.name);
        });
      }
    })
  }

  getPokemonDetails(pokemonNameOrId: string) {
    this.pokemonService.getPokemonDetails(pokemonNameOrId).subscribe({
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
        this.pokemonPage.update((pokemonList) => {
          const newList = [...pokemonList];
          const index = newList.findIndex(pokemon => pokemon.id > newPokemon.id);
          if (index === -1) {
            newList.push(newPokemon);
          } else {
            newList.splice(index, 0, newPokemon);
          }
          return newList;
        });
      }
    });
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
    if (
      (!isNaN(Number(value)) && Number(value) < 1500) || 
      (isNaN(Number(value)))
    ) {
      // idType
      // let result = this.typeList().find(type => type.name === value);
      const type = this.typeList().find(type => type.name === value);
      // console.log(type);
      if (type !== undefined && false) {
        this.getPokemonListByType(type.url);
        console.log('smn');
      } else {
        const results = this.pokemonList().filter(
          item => item.name.includes(value.toLowerCase()) &&
          item.types.some((type: any) => type.toLowerCase() === value.toLowerCase())
        );
        console.log(this.pokemonList())
        this.searchList.update(() => results);
        // console.log(this.searchList.length);
        // get nuevo tamaño
        this.pageLength.set(results.length);
        this.pageIndex.set(0);
        this.pageOffset.set(0);
        this.paginator.pageIndex = 0; // Cambia el index del paginator.
        // console.log(this.pageIndex());
        // console.log(this.pageOffset());
        // console.log(results);
        // console.log(this.pageLength());
        // get solo pagina
        if (results.length) {
          const pageResults = results.slice(0, this.pageSize());
          // console.log(pageResults);
          this.clearPokemonPage();
          pageResults.forEach((item: any) => {
            this.getPokemonDetails(item.name);
          });
        } else {
          // TODO: Mostrar card "sin resultados"
          console.log('sin resultados')
        }
        // console.log(value);
      }
    } else {
      // Sin resultados
    }
  }

}
