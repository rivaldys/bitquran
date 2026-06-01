import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn — class name composer.
 *
 * Combines `clsx` (conditional class joining) with `tailwind-merge`
 * (resolves conflicting Tailwind utilities so the last one wins).
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-primary', className)
 */
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export default cn
