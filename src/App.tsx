import { BiAbacus } from 'react-icons/bi'
import PokeballLogo from '@/assets/pokedex.svg?react'
import PokedexDetails from './components/PokedexDetails'
import PokedexEntry from './components/PokedexEntry'
import { cn } from './utils/Utils'
import { usePokedexStore } from './store/PokedexStore'
import usePokemons from './hooks/usePokemons'

function App() {
    const {
        pokemons,
        isError,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = usePokemons()
    const { isTransitioning, openDetails } = usePokedexStore()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{error?.message}</div>

    return (
        <div className="relative flex flex-col w-screen h-screen gap-8 p-5 bg-slate-200 overflow-clip">
            <button
                className="absolute top-0 left-0 right-0 px-2 py-4 bg-blue-600 rounded disabled:bg-gray-600"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage || !hasNextPage}
            >
                Fetch More
            </button>
            <PokeballLogo className="absolute z-10 w-64 translate-x-1/2 -translate-y-1/2 top-10 right-9 text-black/5" />
            <div className="flex items-center justify-between">
                <h1 className="text-4xl fo nt-bold ">Pokedex</h1>
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
                {pokemons.map((pokemon) => {
                    return (
                        <PokedexEntry
                            key={pokemon.id}
                            name={pokemon.name}
                            id={pokemon.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default App
