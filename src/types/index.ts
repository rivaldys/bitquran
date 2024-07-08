import { LinkProps } from 'next/link'
import { ReactNode } from 'react'

export interface AppLayoutProps {
    children: ReactNode
}

export interface PageContentLayoutProps {
    children: ReactNode
    className?: string
}

export interface ContentSectionProps {
    children: ReactNode
    className?: string
    disableBottomSepartor?: boolean
}

export interface AppLogoProps {
    className?: string
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode
    className?: string
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode
    className?: string
}

export interface TextLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode
    className?: string
}

export interface TextLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    rel?: string
    target?: string
}