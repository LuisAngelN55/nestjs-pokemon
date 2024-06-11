import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor (
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    
    await this.pokemonModel.deleteMany({}); // delete from * Pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // const insertPromisesArray = []; // ARRAY OF PROMISES

    const pokemonToInsert: CreatePokemonDto[] = [];

    data.results.forEach(({ name, url }) => {


      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push( {name, no} );

      // insertPromisesArray.push( //ADDING PROMISES TO ARRAY
      //   this.pokemonModel.create( {name, no})
      // );
    });

  // await Promise.all( insertPromisesArray ); // EXECUTE PROMISES
  await this.pokemonModel.insertMany(pokemonToInsert);

  return 'Seed Executed';

  }
}
