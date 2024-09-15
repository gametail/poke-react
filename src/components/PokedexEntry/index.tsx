import { forwardRef, useEffect, useRef, useState } from 'react'
import typeToIconMap, { PokemonType } from '@/utils/TypeToIconMap'

import { Language } from '@/utils/PokemonApiUtils'
import PokemonNameList from '../PokemonNameList'
import { cn } from '@/utils/Utils'
import { flushSync } from 'react-dom'
import typeToColorMap from '@/utils/TypeToColorMap'
import { useIntersection } from '@mantine/hooks'
import usePokemon from '@/hooks/usePokemon'
import usePokemonColor from '@/hooks/usePokemonColor'

interface IPokedexEntry {
    id: number
    language: Language
}

const PokedexEntry = forwardRef<HTMLDivElement, IPokedexEntry>(
    ({ id, language }, ref) => {
        const imageRef = useRef<HTMLImageElement>(null)
        const cardRef = useRef<HTMLDivElement>(null)

        const [isOpen, setIsOpen] = useState<boolean>(false)
        const [ruleIndices, setRuleIndices] = useState<number[] | null>(null)
        const [inView, setInView] = useState<boolean>(false)

        const { bgColor, textColors } = usePokemonColor(imageRef)
        const { textColorHalf, textColorLow } = textColors || {}

        const { data } = usePokemon(id)
        const { pokemonData } = data || {}
        const { types } = pokemonData || {}

        const { names } = data?.pokemonSpeciesData || {}
        const name =
            names?.find((name) => name.language.name === language)?.name || ''

        const Type1Icon = pokemonData
            ? typeToIconMap[pokemonData.types[0].type.name as PokemonType]
            : null
        const Type2Icon = pokemonData
            ? typeToIconMap[pokemonData.types[1]?.type.name as PokemonType]
            : null

        const type1Color = pokemonData
            ? typeToColorMap[pokemonData.types[0].type.name as PokemonType]
            : ''
        const type2Color = pokemonData
            ? typeToColorMap[pokemonData.types[1]?.type.name as PokemonType]
            : ''

        const handleClick = async () => {
            if (!document.startViewTransition) return

            const anim = document.startViewTransition(() => {
                flushSync(() => {
                    if (!isOpen) {
                        const styleSheet = document.styleSheets[0]
                        const ruleBody = `
                                ::view-transition-group(body-${id}) {
                                    z-index: 100;
                                }`
                        const ruleName = `::view-transition-group(name-${id}) {
                                    z-index: 101;
                                }`
                        const ruleType1 = `::view-transition-group(type-1-${id}) {
                                    z-index: 101;
                                }`
                        const ruleType2 = `::view-transition-group(type-2-${id}) {
                                    z-index: 101;
                                }`
                        const ruleImage = `::view-transition-group(image-${id}) {
                                    z-index: 101;
                                }`

                        const indices = []
                        indices.push(
                            styleSheet.insertRule(
                                ruleBody,
                                styleSheet.cssRules.length
                            )
                        )
                        indices.push(
                            styleSheet.insertRule(
                                ruleName,
                                styleSheet.cssRules.length
                            )
                        )
                        indices.push(
                            styleSheet.insertRule(
                                ruleType1,
                                styleSheet.cssRules.length
                            )
                        )
                        indices.push(
                            styleSheet.insertRule(
                                ruleType2,
                                styleSheet.cssRules.length
                            )
                        )
                        indices.push(
                            styleSheet.insertRule(
                                ruleImage,
                                styleSheet.cssRules.length
                            )
                        )

                        setRuleIndices(indices)
                    }

                    setIsOpen(!isOpen)
                })
            })

            await anim.finished

            if (ruleIndices) {
                const styleSheet = document.styleSheets[0]

                ruleIndices
                    .reverse()
                    .forEach((ruleIndex) => styleSheet.deleteRule(ruleIndex))

                setRuleIndices(null)
            }
        }

        const { ref: intersectionRef, entry } = useIntersection({
            root: cardRef.current,
            threshold: 0.01,
        })

        useEffect(() => {
            if (entry?.isIntersecting) {
                setInView(true)
            } else {
                setInView(false)
            }
        }, [entry, id])

        useEffect(() => {}, [isOpen])

        return (
            <div ref={ref} onClick={handleClick}>
                <div
                    ref={intersectionRef}
                    className={cn('h-32 rounded-xl overflow-clip', {
                        'h-screen w-screen fixed top-0 left-0 bottom-0 right-0 rounded-none z-[60]':
                            isOpen,
                    })}
                    style={{
                        viewTransitionName: inView ? `body-${id}` : undefined,
                    }}
                >
                    <div
                        className={cn(
                            'relative h-full p-4 duration-200 ease-in-out bg-gray-300'
                        )}
                        style={{
                            backgroundColor: bgColor?.rgb,
                            transitionProperty: 'background-color',
                        }}
                    >
                        {isOpen && (
                            <PokemonNameList
                                id={id}
                                isDark={bgColor?.isDark || false}
                                language="en"
                            />
                        )}
                        <div
                            className={cn('', {
                                'flex flex-col items-center w-full absolute top-2 left-0 gap-1':
                                    isOpen,
                            })}
                        >
                            <p
                                className={cn(
                                    'absolute font-extrabold tracking-wide right-5 top-1',
                                    {
                                        'text-3xl w-full text-center static':
                                            isOpen,
                                    }
                                )}
                                style={{
                                    color: textColorHalf,
                                }}
                            >
                                #{String(id).padStart(4, '0')}
                            </p>
                            <p
                                className={cn(
                                    'my-2 font-semibold capitalize text-nowrap text-ellipsis overflow-clip drop-shadow-xl ',
                                    {
                                        'text-8xl text-center font-bold uppercase my-0 -translate-y-2':
                                            isOpen,

                                        'text-7xl': isOpen && name.length >= 7,
                                        'text-6xl': isOpen && name.length >= 8,
                                        'text-5xl': isOpen && name.length >= 9,
                                    }
                                )}
                                style={{
                                    color: textColorHalf,
                                    viewTransitionName: inView
                                        ? `name-${id}`
                                        : undefined,
                                }}
                            >
                                {name}
                            </p>
                            {types && (
                                <div
                                    className={cn(
                                        'flex flex-col gap-2 text-xs',
                                        {
                                            'flex-row gap-4 justify-center font-bold text-xl':
                                                isOpen,
                                        }
                                    )}
                                >
                                    <p
                                        className={cn(
                                            'px-4 py-0.5 rounded-full w-fit capitalize shadow-xl flex gap-2 items-center',
                                            {
                                                'uppercase px-3 py-1': isOpen,
                                            }
                                        )}
                                        style={{
                                            color: isOpen
                                                ? 'white'
                                                : textColorHalf,
                                            backgroundColor: isOpen
                                                ? type1Color
                                                : textColorLow,
                                            viewTransitionName: inView
                                                ? `type-1-${id}`
                                                : undefined,
                                        }}
                                    >
                                        {Type1Icon && isOpen && (
                                            <Type1Icon className="w-5 h-5" />
                                        )}
                                        {types[0].type.name}
                                    </p>
                                    {types[1] && (
                                        <p
                                            className={cn(
                                                'px-4 py-0.5 rounded-full w-fit capitalize shadow-xl flex gap-2 items-center',
                                                {
                                                    'uppercase px-3 py-1':
                                                        isOpen,
                                                }
                                            )}
                                            style={{
                                                color: isOpen
                                                    ? 'white'
                                                    : textColorHalf,
                                                backgroundColor: isOpen
                                                    ? type2Color
                                                    : textColorLow,
                                                viewTransitionName: inView
                                                    ? `type-2-${id}`
                                                    : undefined,
                                            }}
                                        >
                                            {Type2Icon && isOpen && (
                                                <Type2Icon className="w-5 h-5" />
                                            )}
                                            {types[1].type.name}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <img
                            ref={imageRef}
                            className={cn(
                                'absolute right-0 z-50 w-20 bottom-2 drop-shadow-lg',
                                {
                                    'landscape:max-w-80 h-auto pointer-events-none w-full bottom-0':
                                        isOpen,
                                }
                            )}
                            src={`${
                                import.meta.env.BASE_URL
                            }pokemon-artworks/${id}.png`}
                            alt={name}
                            style={{
                                viewTransitionName: inView
                                    ? `image-${id}`
                                    : undefined,
                            }}
                        />

                        {Type1Icon && (
                            <Type1Icon
                                className={cn(
                                    'absolute bottom-0 right-0 w-20 h-20 fill-current',
                                    {
                                        hidden: isOpen,
                                    }
                                )}
                                style={{
                                    color:
                                        textColorLow || 'rgba(128,128,128,0.1)',
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
)

export default PokedexEntry
