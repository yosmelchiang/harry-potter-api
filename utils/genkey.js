// Log key for a random secret key
const key = [...Array(64)].map(() => Math.floor(Math.random()*36).toString(36)).join('')