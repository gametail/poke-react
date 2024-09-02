import { PokeAPI } from 'pokeapi-types'
import { useState, useEffect } from 'react'

const usePokemonData = (limit: number | [number, number]) => {
    const [pokemon, setPokemon] = useState<PokeAPI.Pokemon[]>([])
    const [pokemonSpecies, setPokemonSpecies] = useState<
        PokeAPI.PokemonSpecies[]
    >([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchPokemonData = async () => {
            try {
                const pokemonFetch: PokeAPI.Pokemon[] = []
                const pokemonSpeciesFetch: PokeAPI.PokemonSpecies[] = []

                const isRange = typeof limit !== 'number'
                const startIndex = isRange ? limit[0] : 1
                const endIndex = isRange ? limit[1] : limit

                for (let index = startIndex; index <= endIndex; index++) {
                    const res1 = await fetch(
                        `https://pokeapi.co/api/v2/pokemon/${index}`
                    )
                    const data1: PokeAPI.Pokemon = await res1.json()
                    pokemonFetch.push(data1)

                    const res2 = await fetch(
                        `https://pokeapi.co/api/v2/pokemon-species/${index}`
                    )
                    const data2: PokeAPI.PokemonSpecies = await res2.json()
                    pokemonSpeciesFetch.push(data2)
                }

                setPokemon(pokemonFetch)
                setPokemonSpecies(pokemonSpeciesFetch)
            } catch (err) {
                if (!signal?.aborted) {
                    console.error('Could no fetch Pokemon:', err)
                }
                if (!signal?.aborted) {
                    setError('Could no fetch Pokemon')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
    }, [])

    return { pokemon, pokemonSpecies, loading, error }
}

export default usePokemonData
