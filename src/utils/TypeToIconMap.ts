import BugIcon from '../assets/typeIcons/Bug.svg?react'
import DarkIcon from '../assets/typeIcons/Dark.svg?react'
import DragonIcon from '../assets/typeIcons/Dragon.svg?react'
import ElectricIcon from '../assets/typeIcons/Electric.svg?react'
import FairyIcon from '../assets/typeIcons/Fairy.svg?react'
import FightingIcon from '../assets/typeIcons/Fighting.svg?react'
import FireIcon from '../assets/typeIcons/Fire.svg?react'
import FlyingIcon from '../assets/typeIcons/Flying.svg?react'
import GhostIcon from '../assets/typeIcons/Ghost.svg?react'
import GrassIcon from '../assets/typeIcons/Grass.svg?react'
import GroundIcon from '../assets/typeIcons/Ground.svg?react'
import IceIcon from '../assets/typeIcons/Ice.svg?react'
import NormalIcon from '../assets/typeIcons/Normal.svg?react'
import PoisonIcon from '../assets/typeIcons/Poison.svg?react'
import PsychicIcon from '../assets/typeIcons/Psychic.svg?react'
import RockIcon from '../assets/typeIcons/Rock.svg?react'
import SteelIcon from '../assets/typeIcons/Steel.svg?react'
import WaterIcon from '../assets/typeIcons/Water.svg?react'

export type PokemonType =
    | 'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy'

const typeToIconMap: Record<PokemonType, typeof NormalIcon> = {
    normal: NormalIcon,
    fire: FireIcon,
    water: WaterIcon,
    electric: ElectricIcon,
    grass: GrassIcon,
    ice: IceIcon,
    fighting: FightingIcon,
    poison: PoisonIcon,
    ground: GroundIcon,
    flying: FlyingIcon,
    psychic: PsychicIcon,
    bug: BugIcon,
    rock: RockIcon,
    ghost: GhostIcon,
    dragon: DragonIcon,
    dark: DarkIcon,
    steel: SteelIcon,
    fairy: FairyIcon,
}

export default typeToIconMap
