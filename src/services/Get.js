import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

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