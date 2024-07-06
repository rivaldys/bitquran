import { useState } from 'react'

type FormValue = string | number | boolean | object | Array<object>

export const useForm = (initialValue: any) =>
{
    const [value, setValue] = useState(initialValue)

    if(typeof initialValue !== 'object') return [value, setValue]

    const onChangeHandler = (formType: string | Function, formValue: FormValue) =>
    {
        if(typeof formType === 'string')
        {
            if(formType === 'reset') return setValue(initialValue)
    
            return setValue((previousValue: object) =>
            {
                const keys = formType.split('.')
                const lastKey = keys.pop()

                if(!lastKey) return { ...previousValue, [formType]: formValue }

                let target: any = previousValue
                for(const key of keys) target = target[key]

                target[lastKey] = formValue
                return { ...previousValue }
            })
        }
        
        return setValue((previousValue: FormValue) => formType(previousValue))
    }

    return [value, onChangeHandler]
}