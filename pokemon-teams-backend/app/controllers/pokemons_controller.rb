require 'faker'
class PokemonsController < ApplicationController
    
    def index
        pokemons = Pokemon.all 
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def create 
        newPokemon = {}
        if pokemon_params[:trainer_id].nil?
            render json: {error: "Trainer not found"}, status: 404 
        elsif Trainer.find(pokemon_params[:trainer_id]).pokemons.length <6
            newPokemon[:nickname] = Faker::Name.first_name
            newPokemon[:species] = Faker::Games::Pokemon.name
            @pokemon = Pokemon.create(pokemon_params.merge(newPokemon))
            render json: @pokemon, status: 201
        elsif Trainer.find(pokemon_params[:trainer_id]).pokemons.length >= 6
            render json: { error: "Party is Full!"}, status: 403
        end
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        unless pokemon.nil? 
            pokemon.destroy
            render json: pokemon
        else  
            render json: {error: "Pokemon not found"}, status:404 
        end
    end

    def pokemon_params 
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
