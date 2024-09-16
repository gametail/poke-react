import { RefObject, useEffect, useState } from 'react'

const useTransitionApi = (ref: RefObject<HTMLElement>) => {
    const [transitionElements, setTransitionElements] = useState<HTMLElement[]>(
        []
    )
    const addTransitionNames = () => {
        transitionElements.forEach((element) => {
            const transitionName = element.getAttribute('data-transition-name')

            if (transitionName) {
                element.style.viewTransitionName = transitionName
            }
        })
    }

    const removeTransitionNames = () => {
        transitionElements.forEach((element) => {
            const transitionName = element.getAttribute('data-transition-name')

            if (!transitionName) return

            element.style.viewTransitionName = ''
        })
    }

    useEffect(() => {
        if (!ref.current) return

        if (ref.current) {
            let allTransitionElements: HTMLElement[] = Array.from(
                ref.current.querySelectorAll('[data-transition-name]')
            )

            if (ref.current.hasAttribute('data-transition-name')) {
                allTransitionElements = [ref.current, ...allTransitionElements]
            }

            if (allTransitionElements.length === 0) {
                console.warn(
                    'found no data-transition-name attributes on any element'
                )
                return
            }

            setTransitionElements(allTransitionElements)
        }
    }, [ref])

    return { addTransitionNames, removeTransitionNames }
}

export default useTransitionApi
