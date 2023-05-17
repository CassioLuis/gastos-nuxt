import axios from 'axios'

const baseURL = process.env.SPENT_API

// 'https://spent-api-3yrl.onrender.com'
// process.env.SPENT_API

export function getAllSpents() {
  const response = axios.get(`${baseURL}/spents`)
  return response
}