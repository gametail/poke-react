import { useEffect, useState } from 'react'

import { Language } from '@/utils/PokemonApiUtils'
import { cn } from '@/utils/Utils'
import usePokemon from '@/hooks/usePokemon'

interface IPokemonNameList {
    openDetails: boolean
    isDark: boolean
    id: number
    language: Language
}

const PokemonNameList: React.FC<IPokemonNameList> = ({
    id,
    openDetails,
    isDark,
    language,
}) => {
    const { data } = usePokemon(id)
    const [name, setName] = useState<string>('')
    const [otherNames, setOtherNames] = useState<string[]>([])

    useEffect(() => {
        if (data) {
            const { names } = data.pokemonSpeciesData
            const foundName =
                names.find((name) => name.language.name === language)?.name ||
                ''

            const filteredNames = names
                .filter((name) => name.name !== foundName)
                .map((name) => name.name)
            console.log()

            const uniqueNames = [...new Set(filteredNames)]

            setName(foundName)
            setOtherNames(uniqueNames)
        }

        return () => {
            setName('')
            setOtherNames([])
        }
    }, [])

    return (
        <ul
            className={cn(
                'pointer-events-none uppercase text-nowrap overflow-clip opacity-0 font-bold flex flex-col w-full h-full justify-end z-0',
                {
                    'opacity-100 transition-opacity delay-1000 duration-500 ease-in-out':
                        openDetails,
                }
            )}
            style={{
                color: isDark ? 'rgba(255,255,255, 0.05)' : 'rgba(0,0,0, 0.05)',
            }}
        >
            <li
                className={cn(
                    'text-8xl text-center absolute top-4 w-full drop-shadow-xl',
                    {
                        'text-7xl': name.length >= 7,
                        'text-6xl': name.length >= 8,
                        'text-5xl': name.length >= 9,
                    }
                )}
                style={{
                    color: isDark ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
                }}
            >
                {name}
            </li>
            {otherNames.map((name, index) => (
                <li className="text-9xl" key={index}>
                    {name}
                </li>
            ))}
        </ul>
    )
}

export default PokemonNameList
