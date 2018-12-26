let q = `
    {
        allUser {
            id
        }
    }`

fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: q})
})
.then(r => r.json())
.then(data => console.log('data returned:', data));