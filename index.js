const fetchProjects = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/marcusmonteirodesouza/personal-portfolio/master/projects.json')
    const data = await response.json()
    return data
  } catch (err) {
    throw new Error(err)
  }
}

window.onload = async () => {
  console.log(await fetchProjects())
}
