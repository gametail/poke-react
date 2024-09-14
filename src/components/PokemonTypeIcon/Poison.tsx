import { FC } from 'react'
import { ITypeIcon } from '.'
import { cn } from '@/utils/Utils'

const Poison: FC<ITypeIcon> = ({ className, style, opacity }) => {
    return (
        <svg
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('w-auto h-auto', className)}
            style={{ ...style, opacity: opacity }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M427.821 393.449C479.524 352.108 512 292.376 512 225.95C512 101.161 397.385 0 256 0C114.615 0 0 101.161 0 225.95C0 289.978 30.1737 347.786 78.6553 388.901C75.7171 399.046 74.1052 410.081 74.1052 421.62C74.1052 471.535 104.267 512 141.474 512C165.65 512 186.852 494.915 198.737 469.254C210.622 494.915 231.824 512 256 512C278.038 512 297.604 497.804 309.895 475.857C322.186 497.804 341.752 512 363.789 512C400.996 512 431.158 471.535 431.158 421.62C431.158 411.784 429.986 402.314 427.821 393.449ZM404.211 230.431C404.211 293.785 336.346 345.144 252.632 345.144C168.917 345.144 101.053 293.785 101.053 230.431C101.053 167.077 168.917 115.718 252.632 115.718C336.346 115.718 404.211 167.077 404.211 230.431Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default Poison
