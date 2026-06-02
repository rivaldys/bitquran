import { cva } from 'class-variance-authority'

export interface SkeletonProps {
    className?: string
    height?: number
}

const skeletonStyle = cva('w-full bg-gray-200 relative overflow-hidden rounded-[5px]')

export default function Skeleton({ className, height = 100 }: SkeletonProps) {
    return (
        <div className={skeletonStyle({ className })} style={{ height }}>
            <div className="skeleton-animation" />
        </div>
    )
}
