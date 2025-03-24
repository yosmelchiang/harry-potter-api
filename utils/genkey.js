const key = [...Array(64)].map(() => Math.floor(Math.random()*36).toString(36)).join('')
console.log('key:', key)