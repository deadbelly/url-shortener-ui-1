export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = urlAndTitle => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(urlAndTitle)
  })
      .then(response => console.log(response.json()))
}
