import { RefObject, useEffect, useState } from 'react'

import { FastAverageColorResult } from 'fast-average-color'
import { getColorFromUrl } from '@/utils/ColorUtils'

const usePokemonColor = (imageRef: RefObject<HTMLImageElement>) => {
    const [bgColor, setBgColor] = useState<FastAverageColorResult | null>(null)
    const [textColors, setTextColors] = useState<{
        textColor: string
        textColorHalf: string
        textColorLow: string
    } | null>(null)

    const getPokemonColor = async () => {
        if (imageRef.current) {
            const color = await getColorFromUrl(imageRef.current.src)
            if (!color.error) {
                setBgColor(color)
                setTextColors(
                    color.isDark
                        ? {
                              textColor: 'rgb(255,255,255)',
                              textColorHalf: 'rgb(255,255,255, 0.5)',
                              textColorLow: 'rgb(255,255,255,0.1)',
                          }
                        : {
                              textColor: 'rgb(0,0,0)',
                              textColorHalf: 'rgb(0,0,0, 0.5)',
                              textColorLow: 'rgb(0,0,0,0.1)',
                          }
                )
            }
        }
    }

    useEffect(() => {
        getPokemonColor()
    }, [])

    return { bgColor, textColors }
}
export default usePokemonColor
