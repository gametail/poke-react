import * as Icons from '@/components/PokemonTypeIcon'

import { FC } from 'react'

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
    | 'unknown'

const typeToIconMap: Record<PokemonType, FC<Icons.ITypeIcon>> = {
    normal: Icons.Normal,
    fire: Icons.Fire,
    water: Icons.Water,
    electric: Icons.Electric,
    grass: Icons.Grass,
    ice: Icons.Ice,
    fighting: Icons.Fighting,
    poison: Icons.Poison,
    ground: Icons.Ground,
    flying: Icons.Flying,
    psychic: Icons.Psychic,
    bug: Icons.Bug,
    rock: Icons.Rock,
    ghost: Icons.Ghost,
    dragon: Icons.Dragon,
    dark: Icons.Dark,
    steel: Icons.Steel,
    fairy: Icons.Fairy,
    unknown: Icons.Fairy,
}

export default typeToIconMap
