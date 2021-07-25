import axios from 'axios'

const baseURL = 'https://equran.id/api'

const Get = (path) =>
{
    const promise = new Promise((resolve, reject) =>
    {
        axios.get(`${baseURL}/${path}`)
        .then((result) =>
        {
            resolve(result.data)
        },
        (err) =>
        {
            reject(err)
        })
    })

    return promise
}

export default Get