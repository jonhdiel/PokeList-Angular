import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonModel } from '../model/pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon: PokemonModel = new PokemonModel();

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute) { }
    /* ActivatedRouteSnapshot can be used to traverse the router state tree */

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.pokemonService.getInfo(id)
      .then((pokemon) => {
        this.pokemon = pokemon;
      });
  }

}
