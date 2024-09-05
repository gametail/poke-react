import { PokeAPI } from 'pokeapi-types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const usePokemon = (id: number) => {
    const fetchPokemonSpecies = async () => {
        const { data } = await axios.get<PokeAPI.Pokemon>(
            `https://pokeapi.co/api/v2/pokemon/${id}/`
        )
        return data
    }

    return useQuery({
        queryKey: [id],
        queryFn: fetchPokemonSpecies,
        staleTime: Infinity,
    })
}

export default usePokemon
