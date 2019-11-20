const fetchProfiles = async (url = 'https://raw.githubusercontent.com/marcusmonteirodesouza/personal-portfolio/master/profiles.json') => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const appendProfiles = (profilesElem, profileLinksElem, navLinksElem, profiles) => {
  const appendProfileLinks = (profileLinksElem, profile) => {
    profileLinksElem.innerHTML = ''

    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    h3.className = 'bb'
    const a = document.createElement('a')
    a.className = 'link hover-bg-blue'
    a.href = profile.profile_link
    a.target = '_blank'
    a.textContent = `visit my ${profile.name} profile`
    if (profile.is_main_profile) {
      a.id = 'profile-link'
    }
    h3.append(a)
    li.append(h3)
    profileLinksElem.append(li)

    if ('projects' in profile) {
      const projectsList = document.createElement('ul')
      projectsList.className = 'list'

      profile.projects.forEach(project => {
        const projectTile = document.createElement('li')
        projectTile.className = 'project-tile'

        const projectNameDisplay = document.createElement('h4')
        projectNameDisplay.textContent = project.name
        projectTile.append(projectNameDisplay)

        const projectLinks = document.createElement('ul')
        projectLinks.className = 'list'

        project.links.forEach(link => {
          const li = document.createElement('li')
          const linkElem = document.createElement('a')
          linkElem.href = link.link
          linkElem.target = '_blank'
          linkElem.className = 'link hover-bg-blue'
          linkElem.textContent = link.name
          li.append(linkElem)
          projectLinks.append(li)
        })

        projectTile.append(projectLinks)

        profileLinksElem.append(projectTile)
      })
    }
  }

  profiles.forEach(profile => {
    const li = document.createElement('li')
    li.id = profile.name
    li.className = 'grow shadow-hover'

    const p = document.createElement('p')
    const i = document.createElement('i')
    i.className = profile.iconClassName
    p.append(i)
    const span = document.createElement('span')
    span.className = 'ml2'
    span.textContent = profile.name
    p.append(span)

    li.append(p)

    if (profile.is_main_profile) {
      appendProfileLinks(profileLinksElem, profile)
    }

    li.onclick = () => appendProfileLinks(profileLinksElem, profile)

    profilesElem.append(li)

    // append navlink

    const navLinkContainer = document.createElement('li')
    const navLink = document.createElement('a')
    navLink.href = `#${li.id}`
    navLink.className = 'link dim white'
    navLink.textContent = li.id
    navLinkContainer.append(navLink)
    navLinksElem.append(navLinkContainer)
  })
}

window.onload = async () => {
  const profilesElem = document.getElementById('profiles')
  const profileLinksElem = document.getElementById('profile-links')
  const navLinksElem = document.getElementById('nav-links')
  const profiles = await fetchProfiles()
  appendProfiles(profilesElem, profileLinksElem, navLinksElem, profiles)
}
