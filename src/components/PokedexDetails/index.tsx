import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import PokemonNameList from '../PokemonNameList'
import { cn } from '@/utils/Utils'
import { usePokedexStore } from '@/store/PokedexStore'

interface IPokedexDetails {}

const PokedexDetails: React.FC<IPokedexDetails> = () => {
    const [updatedPosition, setUpdatedPosition] = useState(false)

    const ref = useRef<HTMLDivElement>(null)
    const [img, setImg] = useState<string | undefined>()

    const {
        lastClickedRef,
        setLastClickedRef,
        lastClickedId,
        openDetails,
        setOpenDetails,
        isTransitioning,
        setIsTransitioning,
        detailsBgColor,
    } = usePokedexStore()

    useLayoutEffect(() => {
        if (!lastClickedRef?.current) return
        if (isTransitioning) return

        const img = lastClickedRef.current.querySelector('img')
        if (img) {
            setImg(img?.src)
            const { top, left, width, height } = img.getBoundingClientRect()
            // setImgDim({ top, left, width, height })
            console.log(top, left, width, height)
        }

        setUpdatedPosition(true)

        if (ref.current && detailsBgColor) {
            ref.current.style.backgroundColor = detailsBgColor.rgb
        }

        console.log('new pos')
        return () => setUpdatedPosition(false)
    }, [lastClickedRef])

    useEffect(() => {
        if (updatedPosition) {
            setOpenDetails(true)
            setIsTransitioning(true)
        }
    }, [updatedPosition])

    return (
        <div
            ref={ref}
            className={cn(' absolute text-transparent overflow-clip', {
                'pointer-events-none rounded-xl': !openDetails,
                'rounded-none': openDetails,
                'z-[60]': openDetails || isTransitioning,
            })}
            style={{
                top: openDetails
                    ? 0
                    : lastClickedRef?.current?.getBoundingClientRect().top,
                left: openDetails
                    ? 0
                    : lastClickedRef?.current?.getBoundingClientRect().left,
                transitionProperty: updatedPosition
                    ? 'top, left, width, height, border-radius, background-color'
                    : '',
                transitionTimingFunction: updatedPosition
                    ? 'cubic-bezier(0.65, 0, 0.35, 1)'
                    : '',
                transitionDuration: updatedPosition ? '0.5s' : '',
                width: openDetails
                    ? '100vw'
                    : lastClickedRef?.current?.getBoundingClientRect().width,
                height: openDetails
                    ? '100vh'
                    : lastClickedRef?.current?.getBoundingClientRect().height,
            }}
            onTransitionEnd={() => {
                setIsTransitioning(false)
                if (!openDetails) {
                    setUpdatedPosition(false)
                    setLastClickedRef(null)
                    setImg(undefined)
                }
            }}
            onClick={() => {
                setOpenDetails(false)
                setIsTransitioning(true)
            }}
        >
            {openDetails && (
                <PokemonNameList
                    id={lastClickedId}
                    isDark={detailsBgColor?.isDark || false}
                    openDetails
                    language="en"
                />
            )}

            <img
                src={img}
                className={cn(
                    `absolute w-20 landscape:max-w-80 h-auto bottom-2 right-0 pointer-events-none`,
                    {
                        'w-full bottom-0': openDetails,
                    }
                )}
                style={{
                    transitionProperty: updatedPosition
                        ? 'top, left, width, height'
                        : '',
                    transitionTimingFunction: updatedPosition
                        ? 'cubic-bezier(0.65, 0, 0.35, 1)'
                        : '',
                    transitionDuration: updatedPosition ? '0.5s' : '',
                }}
            />
        </div>
    )
}

export default PokedexDetails
