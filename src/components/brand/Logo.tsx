import { Playball } from 'next/font/google'

const font = Playball({
  weight: '400',
  subsets: ['latin']
})

const SIZE = {
  'sm': 'text-sm',
  'base': 'text-base',
  'md': 'text-md',
  'lg': 'text-lg',
  'xl': 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
} as const

interface LogoProps {
  size: keyof typeof SIZE
}

export default function Logo({ size = 'base' }: LogoProps) {
  return (
    <span
      className={`block leading-none ${font.className} ${SIZE[size]}`}
    >Visual Bookmark</span>
  )
}
