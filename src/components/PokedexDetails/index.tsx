import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/utils/Utils'
import { usePokedexStore } from '@/store/PokedexStore'

interface IPokedexDetails {}
const PokedexDetails: React.FC<IPokedexDetails> = () => {
    // const [top, setTop] = useState(0)
    // const [left, setLeft] = useState(0)
    // const [width, setWidth] = useState(0)
    // const [height, setHeight] = useState(0)
    const [updatedPosition, setUpdatedPosition] = useState(false)

    const ref = useRef<HTMLDivElement>(null)
    const [img, setImg] = useState<string | undefined>()
    // const [imgDim, setImgDim] = useState<
    //     { top: number; left: number; width: number; height: number } | undefined
    // >()

    const {
        lastClickedRef,
        setLastClickedRef,
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
            className={cn(' absolute text-transparent', {
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
                transitionDuration: updatedPosition ? '1s' : '',
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
                    // setLastClickedRef(null)
                    setUpdatedPosition(false)
                    setLastClickedRef(null)
                    setImg(undefined)
                }
            }}
            onClick={() => {
                // setTopLeftPos(['0px', '0px'])
                setOpenDetails(false)
                setIsTransitioning(true)
            }}
        >
            {/* <div
                className={cn(
                    'absolute font-black text-6xl text-nowrap flex flex-col justify-around h-full w-full uppercase pointer-events-none overflow-clip opacity-0 transition-opacity',
                    {
                        'opacity-100': openDetails,
                    }
                )}
                style={{
                    color: getTextColorFromBackground([...detailsBgColor, 0.1]),
                }}
            >
                <p
                    className={cn(
                        'my-4 transition-opacity duration-700 opacity-0 text-center text-4xl',
                        {
                            'opacity-100  delay-500': openDetails,
                        }
                    )}
                    style={{
                        color: getTextColorFromBackground(detailsBgColor),
                    }}
                >
                    フシギダネ
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.1s]': openDetails,
                    })}
                >
                    Fushigidane
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.2s]': openDetails,
                    })}
                >
                    이상해씨
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.3s]': openDetails,
                    })}
                >
                    妙蛙種子
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.4s]': openDetails,
                    })}
                >
                    Bulbizarre
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.5s]': openDetails,
                    })}
                >
                    Bisasam
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.6s]': openDetails,
                    })}
                >
                    Bulbasaur
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.7s]': openDetails,
                    })}
                >
                    Bulbasaur
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.8s]': openDetails,
                    })}
                >
                    Bulbasaur
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[1.9s]': openDetails,
                    })}
                >
                    フシギダネ
                </p>
                <p
                    className={cn('duration-700 translate-x-full', {
                        'translate-x-0 delay-[2s]': openDetails,
                    })}
                >
                    妙蛙种子
                </p>
            </div> */}
            <ul
                className={cn(
                    'absolute pointer-events-none text-6xl uppercase text-nowrap overflow-clip opacity-0 font-bold flex flex-col justify-evenly w-full h-full z-0',
                    {
                        'opacity-100 transition-opacity delay-1000 duration-500 ease-in-out':
                            openDetails,
                    }
                )}
                style={{
                    color: detailsBgColor?.isDark
                        ? 'rgba(255,255,255, 0.1)'
                        : 'rgba(0,0,0, 0.1)',
                }}
            >
                <li
                    className="text-4xl text-center"
                    style={{
                        color: detailsBgColor?.rgba,
                    }}
                >
                    フシギダネ
                </li>
                <li>Fushigidane</li>
                <li>이상해씨</li>
                <li>妙蛙種子</li>
                <li>Bulbizarre</li>
                <li>Bisasam</li>
                <li>Bulbasaur</li>
                <li>Bulbasaur</li>
                <li>Bulbasaur</li>
                <li>フシギダネ</li>
                <li>妙蛙种子</li>
            </ul>

            <img
                src={img}
                className={cn(
                    `absolute w-20 h-20 bottom-2 right-0 pointer-events-none`,
                    {
                        'w-80 h-80': openDetails,
                    }
                )}
                style={{
                    transitionProperty: updatedPosition
                        ? 'top, left, width, height'
                        : '',
                    transitionTimingFunction: updatedPosition
                        ? 'cubic-bezier(0.65, 0, 0.35, 1)'
                        : '',
                    transitionDuration: updatedPosition ? '1s' : '',
                }}
            />
        </div>
    )
}

export default PokedexDetails
