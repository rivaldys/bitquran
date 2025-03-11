import { cva } from 'class-variance-authority'
import './index.css'

export interface SkeletonProps {
    className?: string
    height?: number
}

const skeletonStyle = cva('w-full bg-eselection-gray-5 relative overflow-hidden')

export default function Skeleton({ className, height }: SkeletonProps)
{
    return (
        <div className={skeletonStyle({ className })} style={{ height: height ? height : 100 }}>
            <div className="skeleton-animation"></div>
        </div>
    )
}