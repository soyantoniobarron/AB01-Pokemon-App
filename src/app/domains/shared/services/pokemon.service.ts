import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  constructor() { }

  getPokemonList(limit: number, offset: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonTypes() {
    return this.http.get(`https://pokeapi.co/api/v2/type`);
  }
  
  getPokemonListByType(typeURL: string) {
    return this.http.get(typeURL);
  }

  getPokemonDetails(pokemonNameOrId: any) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
  }


}
