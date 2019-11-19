const fetchProfiles = async (url = 'https://raw.githubusercontent.com/marcusmonteirodesouza/personal-portfolio/master/projects.json') => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const appendProfiles = (profilesElem, navLinksElem, profiles) => {
  profiles.forEach(profile => {
    const profileContainer = document.createElement('li')
    profileContainer.id = profile.name

    const profileNameDisplay = document.createElement('h3')
    profileNameDisplay.textContent = profile.name
    profileContainer.append(profileNameDisplay)

    const profileLink = document.createElement('a')
    profileLink.href = profile.profile_link
    profileLink.target = '_blank'
    if (profile.is_main_profile) {
      profileLink.id = 'profile-link'
    }
    const icon = document.createElement('i')
    icon.className = profile.iconClassName
    profileLink.append(icon)
    profileContainer.append(profileLink)

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
          linkElem.className = 'link'
          linkElem.textContent = link.name
          li.append(linkElem)
          projectLinks.append(li)
        })

        projectTile.append(projectLinks)

        profileContainer.append(projectTile)
      })
    }
    profilesElem.append(profileContainer)

    // append navlink

    const navLinkContainer = document.createElement('li')
    const navLink = document.createElement('a')
    navLink.href = `#${profileContainer.id}`
    navLink.className = 'link'
    navLink.textContent = profileContainer.id
    navLinkContainer.append(navLink)
    navLinksElem.append(navLinkContainer)
  })
}

window.onload = async () => {
  const profilesElem = document.getElementById('profiles')
  const profiles = await fetchProfiles('./profiles.json')
  const navLinksElem = document.getElementById('nav-links')
  appendProfiles(profilesElem, navLinksElem, profiles)
}
