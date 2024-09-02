import typeToIconMap, { PokemonType } from '@/utils/TypeToIconMap'
import { useRef, useState } from 'react'
import { prominent } from 'color.js'
import { getTextColorFromBackground } from '@/utils/ColorUtils'
import { usePokedexStore } from '@/store/PokedexStore'
import { cn } from '@/utils/Utils'

interface IPokedexEntry {
    name: string
    id: number
    types: [PokemonType, PokemonType?]
}

const PokedexEntry: React.FC<IPokedexEntry> = ({ name, id, types }) => {
    const imageRef = useRef(null)
    const [bgColor, setBgColor] = useState<[number, number, number]>([
        255, 255, 255,
    ])
    const ref = useRef(null)
    const {
        setLastClickedRef,
        isTransitioning,
        setDetailsBgColor,
        openDetails,
        lastClickedId,
        setLastClickedId,
    } = usePokedexStore()

    const colorHalf = getTextColorFromBackground([...bgColor, 0.5])
    const colorLow = getTextColorFromBackground([...bgColor, 0.1])

    const TypeIcon = typeToIconMap[types[0]]
    return (
        <div
            ref={ref}
            className={cn('z-40 h-32 bg-white rounded-xl overflow-clip', {
                'z-[50] bg-transparent':
                    (isTransitioning || openDetails) && lastClickedId === id,
            })}
            onClick={() => {
                if (!isTransitioning) {
                    setLastClickedRef(ref)
                    setLastClickedId(id)
                    setDetailsBgColor(bgColor)
                }
            }}
        >
            <div
                className={cn(
                    'relative h-full p-4 transition-opacity duration-200 ease-in-out',
                    {
                        ' opacity-0': openDetails && lastClickedId === id,
                    }
                )}
                style={{
                    backgroundColor: `rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]}, 0.9)`,
                }}
            >
                <p className="absolute font-extrabold tracking-wide right-5 top-1 text-black/40">
                    #{String(id).padStart(4, '0')}
                </p>
                <p
                    className="my-2 font-semibold capitalize text-nowrap text-ellipsis overflow-clip"
                    style={{
                        color: colorHalf,
                    }}
                >
                    {name}
                </p>
                <div className="flex flex-col gap-2">
                    <p
                        className="px-4 py-0.5 text-xs rounded-full bg-white/25 w-fit capitalize"
                        style={{
                            color: colorHalf,
                            backgroundColor: colorLow,
                        }}
                    >
                        {types[0]}
                    </p>
                    {types[1] && (
                        <p
                            className="px-4 py-0.5 text-xs rounded-full bg-white/25 w-fit capitalize"
                            style={{
                                color: colorHalf,
                                backgroundColor: colorLow,
                            }}
                        >
                            {types[1]}
                        </p>
                    )}
                </div>
                <img
                    ref={imageRef}
                    onLoad={() => {
                        if (!imageRef.current) return
                        prominent(imageRef.current, {
                            format: 'array',
                            sample: 10,
                            group: 3,
                        }).then((color) => {
                            const [, color2] = color
                            setBgColor(color2 as [number, number, number])
                        })
                    }}
                    className="absolute right-0 z-50 w-20 bottom-2 drop-shadow-lg"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={name}
                />
                <TypeIcon
                    className="absolute bottom-0 right-0 w-20 h-20 fill-current"
                    style={{
                        color: colorLow,
                    }}
                />
            </div>
        </div>
    )
}

export default PokedexEntry
