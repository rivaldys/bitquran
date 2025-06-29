import { Children, isValidElement, type ReactElement, type ReactNode, useEffect } from 'react'

interface HeadProps {
    children: ReactNode
}

/**
 * <Head>
 *
 * Custom React component that mimics the behavior of Next.js's <Head>.
 * This component allows declarative manipulation of <head> elements such as <title>, <meta>, and <link>
 * from within a React component tree.
 *
 * Features:
 * - Supports only specific HTML head tags: `title`, `meta`, `link`, `base`, `style`.
 * - Updates `document.title` when a <title> tag with a string child is provided.
 * - For other valid tags, it will update the attributes or create new elements in <head> if none exist.
 * - Cleans up (removes) any dynamically created elements on unmount.
 * - In development mode, warns the developer when an unsupported tag is used.
 *
 * ⚠️ Notes:
 * - Only supports plain string content for <title>.
 * - Uniqueness of elements is determined by attributes like `name`, `property`, or `rel`.
 * - Runs every time the `children` prop changes.
 *
 * @param {HeadProps} props - Component props.
 * @param {ReactNode} props.children - React elements representing head tags.
 *
 * @example
 * <Head>
 *     <title>My Page</title>
 *     <meta name="description" content="A beautiful page" />
 *     <link rel="canonical" href="https://example.com" />
 * </Head>
 *
 * @author Created with a cup of tea by Ahmad Rivaldy S
 * @since 2025
 */
export default function Head({ children }: HeadProps)
{
    useEffect(() => {
        const createdTags: HTMLElement[] = []
        const validTags = ['title', 'meta', 'link', 'base', 'style']

        Children.forEach(children, (child: ReactNode) =>
        {
            if(!isValidElement(child)) return

            const tagType = child.type
            const tagName = typeof tagType === 'string' ? tagType : null

            if(!tagName || !validTags.includes(tagName))
            {
                if(import.meta.env.DEV)
                {
                    console.warn(
                        `<${tagName}> is not supported by <Head>. ` +
                        `Only the following tags are allowed: ${validTags.join(', ')}.`
                    )
                }
                return
            }

            const tag = child as ReactElement
            const { children: tagChildren, ...attrs } = tag.props as {
                children?: ReactNode
                [key: string]: unknown
            }

            if(tagName === 'title')
            {
                if(typeof tagChildren === 'string')
                {
                    document.title = tagChildren
                }

                return
            }

            let selector = tagName
            if('name' in attrs && typeof attrs.name === 'string')
            {
                selector += `[name="${attrs.name}"]`
            }
            else if('property' in attrs && typeof attrs.property === 'string')
            {
                selector += `[property="${attrs.property}"]`
            }
            else if('rel' in attrs && typeof attrs.rel === 'string')
            {
                selector += `[rel="${attrs.rel}"]`
            }

            let element = document.head.querySelector(selector) as HTMLElement | null

            if(!element)
            {
                element = document.createElement(tagName)
                document.head.appendChild(element)
                createdTags.push(element)
            }

            Object.entries(attrs).forEach(([key, value]) =>
            {
                if(value != null)
                {
                    element!.setAttribute(key, String(value))
                }
            })

            if(typeof tagChildren === 'string')
            {
                element.textContent = tagChildren
            }
        })

        return () => {
            createdTags.forEach(el => el.remove())
        }
    }, [children])

    return null
}
