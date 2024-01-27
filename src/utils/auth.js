// const baseUrl = 'http://api.mariia.movies.nomoredomainsrocks.ru'

import {BaseUrl} from "./constants.js"

function getResData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
}

export function registration(username, email, password) {
  return fetch(`${BaseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: username,
        email: email,
        password: password,
    })
  })
  .then(res => getResData(res))
}

export function login(email, password) {
  return fetch(`${BaseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      
    })
  })
  .then(res => getResData(res))
}

export function checkToken(token) {
  return fetch(`${BaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }})
  .then(res => getResData(res))
}