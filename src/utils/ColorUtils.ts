import { FastAverageColor } from 'fast-average-color'

export async function getColorFromUrl(url: string) {
    const fac = new FastAverageColor()
    const color = await fac.getColorAsync(url)
    return color
}
