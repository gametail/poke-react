import { useEffect, useState } from 'react'

import { Language } from '@/utils/PokemonApiUtils'
import { cn } from '@/utils/Utils'
import usePokemon from '@/hooks/usePokemon'

interface IPokemonNameList {
    isDark: boolean
    id: number
    language: Language
}

const PokemonNameList: React.FC<IPokemonNameList> = ({
    id,
    isDark,
    language,
}) => {
    const { data } = usePokemon(id)
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

            const uniqueNames = [...new Set(filteredNames)]

            setOtherNames(uniqueNames)
        }

        return () => {
            setOtherNames([])
        }
    }, [id])

    return (
        <ul
            className={cn(
                'pointer-events-none uppercase text-nowrap overflow-clip font-bold flex flex-col w-full h-full justify-end z-0',
                {}
            )}
            style={{
                color: isDark ? 'rgba(255,255,255, 0.05)' : 'rgba(0,0,0, 0.05)',
            }}
        >
            {otherNames.map((name, index) => (
                <li className="text-9xl" key={index}>
                    {name}
                </li>
            ))}
        </ul>
    )
}

export default PokemonNameList
