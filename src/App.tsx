import { useEffect, useRef } from 'react'

import { BiAbacus } from 'react-icons/bi'
import PokeballLogo from '@/assets/pokedex.svg?react'
import PokedexEntry from './components/PokedexEntry'
import PokedexEntrySkeleton from './components/PokedexEntrySkeleton'
import { cn } from './utils/Utils'
import { useIntersection } from '@mantine/hooks'
import usePokemons from './hooks/usePokemons'

function App() {
    const { pokemons, isError, error, isLoading, fetchNextPage, hasNextPage } =
        usePokemons()
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

    if (isLoading) return <PokedexEntrySkeleton visible={isLoading} />
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
                    {}
                )}
            >
                {pokemons.map((pokemon, index) => {
                    return (
                        <PokedexEntry
                            ref={
                                hasNextPage && index === pokemons.length - 10
                                    ? ref
                                    : null
                            }
                            key={pokemon.id}
                            language="de"
                            id={pokemon.id}
                        />
                    )
                })}
                <PokedexEntrySkeleton
                    visible={hasNextPage}
                    fetchNextPage={fetchNextPage}
                />
            </div>
        </div>
    )
}

export default App
