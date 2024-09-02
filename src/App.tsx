import { BiAbacus } from 'react-icons/bi'
import PokedexEntry from './components/PokedexEntry'
import usePokemonData from './hooks/usePokemon'
import { PokemonType } from './utils/TypeToIconMap'
import PokeballLogo from '@/assets/pokedex.svg?react'
import PokedexDetails from './components/PokedexDetails'
import { cn } from './utils/Utils'
import { usePokedexStore } from './store/PokedexStore'

function App() {
    const { pokemon, pokemonSpecies, error, loading } = usePokemonData([1, 20])
    const { isTransitioning, openDetails } = usePokedexStore()

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="relative flex flex-col w-screen h-screen gap-8 p-5 bg-slate-200 overflow-clip">
            <PokeballLogo className="absolute z-10 w-64 translate-x-1/2 -translate-y-1/2 top-10 right-9 text-black/5" />
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold ">Pokedex</h1>
                <button className="relative overflow-visible">
                    <BiAbacus className="text-3xl" />
                </button>
            </div>
            <div
                className={cn(
                    'z-20 grid grid-cols-2 gap-2 overflow-y-auto rounded-lg landscape:grid-cols-4 grow',
                    {
                        'overflow-hidden': isTransitioning || openDetails,
                    }
                )}
            >
                <PokedexDetails />
                {pokemon.map((entry) => {
                    return (
                        <PokedexEntry
                            key={entry.id}
                            name={entry.name}
                            id={entry.id}
                            types={[
                                entry.types[0].type.name as PokemonType,
                                entry.types[1]?.type.name as PokemonType,
                            ]}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default App
