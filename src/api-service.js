// const Token = "a5f742ed10c01cd442900e7c6fa3dd8566b34d7a"
import { useCookies } from "react-cookie"

export default class API{

    static registerUser(body){
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            method : 'POST',
            headers :{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( body )
        }).then(resp => resp.json())
    }

    static loginUser(body){
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method : 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( body )
        }).then(resp =>resp.json())
    }

    static updateMovie(mov_id, body, token){
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
            }). then ( resp => resp.json())
    }

    static createMovie(body, token){
        return fetch(`http://127.0.0.1:8000/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }). then (resp =>resp.json())
    }
    static deleteMovie(mov_id, token){
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            // body: JSON.stringify(body)
        })
    }
}