import typeToIconMap, { PokemonType } from '@/utils/TypeToIconMap'

import { cn } from '@/utils/Utils'
import { usePokedexStore } from '@/store/PokedexStore'
import usePokemon from '@/hooks/usePokemon'
import usePokemonColor from '@/hooks/usePokemonColor'
import { useRef } from 'react'

interface IPokedexEntry {
    name: string
    id: number
}

const PokedexEntry: React.FC<IPokedexEntry> = ({ name, id }) => {
    const imageRef = useRef(null)
    const ref = useRef(null)
    const {
        setLastClickedRef,
        isTransitioning,
        setDetailsBgColor,
        openDetails,
        lastClickedId,
        setLastClickedId,
    } = usePokedexStore()
    const { data } = usePokemon(id)
    const { bgColor, textColors } = usePokemonColor(imageRef)
    const { textColorHalf, textColorLow } = textColors || {}

    const { pokemonData } = data || {}
    const { types } = pokemonData || {}

    const TypeIcon = pokemonData
        ? typeToIconMap[pokemonData.types[0].type.name as PokemonType]
        : null

    return (
        <div
            ref={ref}
            className={cn('z-40 h-32 rounded-xl overflow-clip', {
                'z-[50] bg-transparent':
                    (isTransitioning || openDetails) && lastClickedId === id,
            })}
            onClick={() => {
                if (!isTransitioning && bgColor) {
                    setLastClickedRef(ref)
                    setLastClickedId(id)
                    setDetailsBgColor(bgColor)
                }
            }}
        >
            <div
                className={cn(
                    'relative h-full p-4 duration-200 ease-in-out bg-gray-300',
                    {
                        ' opacity-0': openDetails && lastClickedId === id,
                    }
                )}
                style={{
                    backgroundColor: bgColor?.rgb,
                    transitionProperty: 'background-color, opacity',
                }}
            >
                <p
                    className="absolute font-extrabold tracking-wide right-5 top-1"
                    style={{
                        color: textColorHalf,
                    }}
                >
                    #{String(id).padStart(4, '0')}
                </p>
                <p
                    className="my-2 font-semibold capitalize text-nowrap text-ellipsis overflow-clip"
                    style={{
                        color: textColorHalf,
                    }}
                >
                    {name}
                </p>
                {types && (
                    <div className="flex flex-col gap-2">
                        <p
                            className="px-4 py-0.5 text-xs rounded-full w-fit capitalize"
                            style={{
                                color: textColorHalf,
                                backgroundColor: textColorLow,
                            }}
                        >
                            {types[0].type.name}
                        </p>
                        {types[1] && (
                            <p
                                className="px-4 py-0.5 text-xs rounded-full w-fit capitalize"
                                style={{
                                    color: textColorHalf,
                                    backgroundColor: textColorLow,
                                }}
                            >
                                {types[1].type.name}
                            </p>
                        )}
                    </div>
                )}
                <img
                    ref={imageRef}
                    className="absolute right-0 z-50 w-20 bottom-2 drop-shadow-lg"
                    src={`${
                        import.meta.env.BASE_URL
                    }pokemon-artworks/${id}.png`}
                    alt={name}
                />
                {TypeIcon && (
                    <TypeIcon
                        className="absolute bottom-0 right-0 w-20 h-20 fill-current"
                        style={{
                            color: textColorLow || 'rgba(128,128,128,0.1)',
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default PokedexEntry
