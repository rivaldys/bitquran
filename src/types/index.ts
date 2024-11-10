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

export interface SurahItemProps {
    number: string | number
    title: string
    description: string
    label: string
    containerClassName?: string
    className?: string
    href: string
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode
    className?: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
    className?: string
    disabled?: boolean
}

export interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
    children: ReactNode
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

export interface ToolbarProps {
    className?: string
    number?: string | number
    audioButton?: {
        src: string
        onClick: React.MouseEventHandler<HTMLButtonElement>
        title?: string
    }
    docButton?: {
        onClick: React.MouseEventHandler<HTMLButtonElement>
        title?: string
    }
}

export interface VerseItemProps {
    className?: string
    toolbar?: {
        number?: string | number
        audioButton?: {
            src: string
            onClick: React.MouseEventHandler<HTMLButtonElement>
            title?: string
        }
        docButton?: {
            onClick: React.MouseEventHandler<HTMLButtonElement>
            title?: string
        }
    }
    verse: {
        ar: string
        id: string
    }
    disableBottomSepartor?: boolean
}