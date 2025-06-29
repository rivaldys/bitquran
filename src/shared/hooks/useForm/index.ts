import { useState, useCallback } from 'react'

type FormType = string | ((prev: any) => any)
type FormValue = string | number | boolean | object | Array<object>

function setNestedValue<T extends Record<string, any>>(obj: T, path: string[], value: FormValue): T
{
    if(path.length === 0) return value as T

    const [head, ...rest] = path

    return {
        ...obj,
        [head]: setNestedValue(obj?.[head] ?? {}, rest, value)
    }
}

/**
 * useForm
 *
 * Custom React hook for managing form state represented as an object. 
 * It supports updating fields using dot notation (e.g., "user.profile.name"), 
 * resetting to the initial state, and functional updates (like useState).
 *
 * @template T - The shape of the form state object.
 * @param {T} initialValue - The initial state value, must be an object.
 * @returns {[T, (key: string | ((prev: T) => T), value?: any) => void]} A tuple containing the current state and an updater function.
 *
 * @example
 * // 1. Without explicit type
 * const [form, setFormValue] = useForm({
 *     user: {
 *         profile: {
 *             name: '',
 *             age: 0,
 *         },
 *         email: ''
 *     }
 * })
 *
 * setFormValue('user.profile.name', 'Alice')       // Updates nested field
 * setFormValue('user.email', 'alice@example.com')  // Updates top-level field
 * setFormValue('reset')                            // Resets form to initialValue
 * setFormValue(prev => ({
 *     ...prev,
 *     user: {
 *         ...prev.user,
 *         profile: {
 *             ...prev.user.profile,
 *             age: 25
 *         }
 *     }
 * }))
 *
 * // 2. With explicit generic type
 * type UserForm = {
 *     user: {
 *         profile: {
 *             name: string
 *             age: number
 *         },
 *         email: string
 *     }
 * }
 *
 * const [form, setFormValue] = useForm<UserForm>({
 *     user: {
 *         profile: {
 *             name: '',
 *             age: 0
 *         },
 *         email: ''
 *     }
 * })
 * 
 * @author Created with a cup of tea by Ahmad Rivaldy S
 * @since 2025
 */
const useForm = <T extends object>(initialValue: T) =>
{
    const [values, setValues] = useState<T>(initialValue)

    const setFormValue = useCallback((formType: FormType, formValue?: FormValue) =>
    {
        if(typeof formType === 'string')
        {
            if(formType === 'reset')
            {
                setValues(initialValue)
                return
            }

            if(formValue === undefined)
            {
                console.warn('formValue is required when formType is a string path')
                return
            }

            const keys = formType.split('.')
            if(!keys.length) return

            setValues(prev => setNestedValue(prev, keys, formValue))
            return
        }

        setValues(prev => formType(prev))
    }, [initialValue])

    return [values, setFormValue] as const
}

export default useForm