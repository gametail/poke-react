import { useEffect, useRef } from 'react'

import { BiAbacus } from 'react-icons/bi'
import PokeballLogo from '@/assets/pokedex.svg?react'
import PokedexDetails from './components/PokedexDetails'
import PokedexEntry from './components/PokedexEntry'
import PokedexEntrySkeleton from './components/PokedexEntrySkeleton'
import { cn } from './utils/Utils'
import { useIntersection } from '@mantine/hooks'
import { usePokedexStore } from './store/PokedexStore'
import usePokemons from './hooks/usePokemons'

function App() {
    const { pokemons, isError, error, isLoading, fetchNextPage, hasNextPage } =
        usePokemons()
    const { isTransitioning, openDetails } = usePokedexStore()
    const lastEntryRef = useRef<HTMLDivElement>(null)
    const { ref, entry } = useIntersection({
        root: lastEntryRef.current,
        threshold: 1,
    })

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage()
        }
    }, [entry])

    if (isLoading) return <PokedexEntrySkeleton />
    if (isError) return <div>{error?.message}</div>

    return (
        <div className="relative flex flex-col w-screen h-screen gap-8 p-5 bg-slate-200 overflow-clip">
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
                {hasNextPage && <PokedexEntrySkeleton ref={ref} />}
            </div>
        </div>
    )
}

export default App
