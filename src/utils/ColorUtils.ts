import { FastAverageColor } from 'fast-average-color'

// Function to calculate luminance of an RGB color
function getLuminance(color: [number, number, number]): number {
    // Normalize RGB values to a 0-1 range
    const [R, G, B] = color.map((v) => v / 255)

    // Calculate luminance using the standard formula
    const luminance = 0.299 * R + 0.587 * G + 0.114 * B
    return luminance
}

// Function to determine the best text color (black or white) based on background color luminance
export function getTextColorFromBackground(
    color: [number, number, number, number?]
): string {
    const [r, g, b, alpha = 1] = color
    const luminance = getLuminance([r, g, b])
    // Use black text if luminance is high, white text if low
    return luminance > 0.5
        ? `rgba(0,0,0,${alpha})`
        : `rgba(255,255,255,${alpha})`
}

export async function getColorFromUrl(url: string) {
    const fac = new FastAverageColor()
    const color = await fac.getColorAsync(url)
    return color
}
