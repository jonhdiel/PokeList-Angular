import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { PokemonModel } from './model/pokemon';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient) {}

  protected getHeaders() {
    const requestHeaders = new HttpHeaders();
    requestHeaders.set('Content-Type', 'application/json');
    return { headers: requestHeaders };
  }

  getPokemonList() {
    return this.http.get(environment.urls.pokemonList, this.getHeaders())
      .toPromise()
      .then((res: HttpResponse<PokemonModel>) => {
        const info = res;
        const pokemonList = [];
        let n = 1;
        info['results'].forEach((entry) => {
          const pokemon = new PokemonModel();
          pokemon.name = entry.name;
          pokemon.id = n;
          n += 1;
          /* Só tem info de poke até um certo id, o resto só existe o registro */
          pokemonList.push(pokemon);
        });
        return pokemonList;

      });
  }

  getInfo(id: number) {
    return this.http.get(environment.urls.pokemon + id + '/', this.getHeaders())
      .toPromise()
      /* Precisa transformar em Promise para usar Observable */
      .then((res: HttpResponse<PokemonModel>) => {
        const info = res;
        const pokemon = new PokemonModel();
        pokemon.name = info['name'];
        pokemon.id = info['id'];
        pokemon.next = pokemon.id + 1;

        info['types'].forEach((type) => {
          pokemon.types.push(type.type.name);
        });

        info['stats'].forEach((stats) => {
          pokemon.stats.push({
            name: stats.stat.name,
            value: stats.base_stat
          });
        });

        return pokemon;
      });
  }
}
