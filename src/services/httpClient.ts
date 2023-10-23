import axios from 'axios'

export const httpClient = axios.create({
  baseURL: '/api'
})

// could have some configurations (tokens, headers, etc..)
export const initClient = () => {
  httpClient.defaults.headers.common['x-auth-token'] = 'a9zLiDZUsHE9uZdyafw9o@dPxTLGU-ZN4G'
}
