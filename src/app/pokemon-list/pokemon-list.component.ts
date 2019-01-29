import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonModel } from '../model/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemonList: PokemonModel[] = [];
  pokemonGrid: PokemonModel[] = [];

  constructor(
    private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemonList()
      .then((pokemon) => {

        this.pokemonList = pokemon;
        this.pokemonGrid = [];

        this.pokemonList.forEach(p => {
          this.pokemonGrid.push(p);
        });
      });
  }

}
