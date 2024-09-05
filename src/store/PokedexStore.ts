import { FastAverageColorResult } from 'fast-average-color'
import { RefObject } from 'react'
import { create } from 'zustand'

interface IPokedexState {
    //Provider Dialog Ref
    lastClickedRef: null | RefObject<HTMLDivElement>
    setLastClickedRef: (
        lastClickedRef: null | RefObject<HTMLDivElement>
    ) => void

    lastClickedId: number
    setLastClickedId: (lastClickedId: number) => void

    openDetails: boolean
    setOpenDetails: (openDetails: boolean) => void

    isTransitioning: boolean
    setIsTransitioning: (isTransitioning: boolean) => void

    detailsBgColor: FastAverageColorResult | null
    setDetailsBgColor: (detailsBgColor: FastAverageColorResult) => void
}

export const usePokedexStore = create<IPokedexState>()((set) => ({
    lastClickedRef: null,
    setLastClickedRef: (lastClickedRef) => set({ lastClickedRef }),

    lastClickedId: 0,
    setLastClickedId: (lastClickedId) => set({ lastClickedId }),

    openDetails: false,
    setOpenDetails: (openDetails) => set({ openDetails }),

    isTransitioning: false,
    setIsTransitioning: (isTransitioning) => set({ isTransitioning }),

    detailsBgColor: null,
    setDetailsBgColor: (detailsBgColor) => set({ detailsBgColor }),
}))
