import { FC, useEffect, useRef } from 'react'

import { cn } from '@/utils/Utils'
import { useIntersection } from '@mantine/hooks'

interface IPokedexEntrySkeleton {
    className?: string
    visible: boolean
    fetchNextPage?: () => unknown
}

const PokedexEntrySkeleton: FC<IPokedexEntrySkeleton> = ({
    className,
    visible,
    fetchNextPage,
}) => {
    const lastEntryRef = useRef<HTMLDivElement>(null)
    const { ref, entry } = useIntersection({
        root: lastEntryRef.current,
        threshold: 1,
    })

    useEffect(() => {
        if (entry?.isIntersecting && fetchNextPage) {
            fetchNextPage()
        }
    }, [entry])

    return (
        <div
            ref={ref}
            className={cn(
                className,
                'relative h-32 p-4 bg-gray-400 rounded-xl',
                { hidden: !visible }
            )}
        >
            <div className="w-full h-full animate-pulse">
                <div className="absolute h-4 bg-gray-500/75 w-14 right-5 top-3 rounded-xl"></div>
                <div className="w-16 h-4 my-3 bg-gray-500/75 rounded-xl"></div>

                <div className="flex flex-col gap-2">
                    <div className="w-16 h-4 bg-gray-500/75 rounded-xl"></div>

                    <div className="w-16 h-4 bg-gray-500/75 rounded-xl"></div>
                </div>

                <div className="absolute flex items-center justify-center w-16 h-16 text-5xl font-black rounded-full bg-gray-500/75 right-4 bottom-4">
                    ?
                </div>
            </div>
        </div>
    )
}

export default PokedexEntrySkeleton
