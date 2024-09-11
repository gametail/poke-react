import { PokeAPI } from 'pokeapi-types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const usePokemon = (id: number) => {
    const fetchPokemonAndSpecies = async () => {
        if (id === 0) throw new Error('Invalid ID')

        const { data: pokemonData } = await axios.get<PokeAPI.Pokemon>(
            `https://pokeapi.co/api/v2/pokemon/${id}/`
        )
        const { data: pokemonSpeciesData } =
            await axios.get<PokeAPI.PokemonSpecies>(
                `https://pokeapi.co/api/v2/pokemon-species/${id}/`
            )
        return { pokemonData, pokemonSpeciesData }
    }

    return useQuery({
        queryKey: [id],
        queryFn: fetchPokemonAndSpecies,
        staleTime: Infinity,
    })
}

export default usePokemon
