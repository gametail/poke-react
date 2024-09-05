import { PokeAPI } from 'pokeapi-types'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'

const LIMIT = 20

const usePokemons = () => {
    const fetchPokemon = async ({ pageParam = 0 }) => {
        const offset = LIMIT * pageParam
        const { data } = await axios.get<PokeAPI.NamedAPIResourceList>(
            `https://pokeapi.co/api/v2/pokemon`,
            {
                params: {
                    limit: LIMIT,
                    offset,
                },
            }
        )
        return data
    }

    const {
        data,
        isError,
        isLoading,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['pokemon'],
        queryFn: fetchPokemon,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            const currentOffset = lastPageParam * LIMIT
            if (lastPage.next === null || currentOffset > 1025) {
                return undefined
            }
            return lastPageParam + 1
        },
        staleTime: Infinity,
    })

    const fetchedPokemon = data?.pages.flatMap((page) => page.results) || []
    const pokemonsWithId = fetchedPokemon
        .map((pokemon) => {
            const id = parseInt(pokemon.url.split('/')[6])
            return { ...pokemon, id }
        })
        .filter((pokemon) => pokemon.id <= 1025)

    return {
        pokemons: pokemonsWithId,
        isError,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    }
}
export default usePokemons
