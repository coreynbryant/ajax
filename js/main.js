const token = 'addtokenhere'
fetch('https://api.github.com/user/repos', {
  headers: {
    // Authorization: `Bearer ${encoded}`
    Authorization: `Bearer ${token}`
  }
})
  .then(response => {
    return response.json()
      .then(body => {
        if (response.ok) return body
        return Promise.reject({ body })
      })
  })
  .then(data => data.map(repo => {
    return {
      name: repo.name,
      url: repo['html_url'],
      stars: repo['stargazers_count']
    }
  }))
  .then(data => data
    // .filter(repo => repo.stars > 50)
    .map(repo =>
      `<li><a href="${repo.url}">${repo.name} (${repo.stars} stars)</a></li>`
    )
    .join(''))
  .then(HTMLString => {
    const ol = document.createElement('ol')
    ol.innerHTML = HTMLString
    document.body.append(ol)
  })
  .catch(error => console.log(`error is`, error))
