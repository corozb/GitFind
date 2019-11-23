const printName = () => {
  const $name = document.getElementById('textbox').value
  localStorage.setItem('username', $name)
}


const $user = document.getElementById('nickname')
$user.innerHTML = localStorage.getItem('username')


// ------------------
// GITHUB
class Github {

  constructor() {
    this.client_id = 'c6e8ed0126dcb11ca7ed'
    this.client_secret = 'c0c361829358d7502935b8035018bfba81311828'
  }

  async getRepo(userText) {
    // const URL_API = 'https://api.github.com/search/repositories?'
    // const repoResponse = await fetch(`${URL_API}q=${userText}&sort=stars&order=desc`)
    const repoResponse = await fetch(`https://api.github.com/search/repositories?q=${userText}&client_id=${this.client_id}&client_secret=${this.client_secret}&sort=stars&order=desc`)
    // console.log(repoResponse)

    const repo = await repoResponse.json()
    console.log(repo.items)

    return {
      repo: repo.items
    }
  }

}


// UI
class UI {
  
  constructor() {

    this.displayRepo = document.querySelector('.displayRepo')
  }

  // Display Repo
  showRepo(repo) {
    console.log(repo)

    let output = ''

    repo.forEach((repo) => {
      output += 
      `
      <div class="container-box">
        <h3>${repo.name}</h3>
        <hr>
        <p>${repo.description}</p>
        <p>cantidad estrellas: <span>${repo.stargazers_count}</span></p>
        <a href="${repo.html_url}"# target="_blank">Visitar Repo</a>
        <a href="#" class="star">star</a>
      </div>
      `
    
    });

    document.querySelector('.displayRepo').innerHTML = output
  }

  clearProfile() {
    this.displayRepo.innerHTML = ''
  }
}



// APP
// init GitHub
const gitRepo = new Github();

// init UI
const ui = new UI()

// Search Repo

const searchRepo = document.querySelector('.searchGitHub')

// Add Event Listener

searchRepo.addEventListener('keyup', (e) => {


  // get input text

  const userText = e.target.value
  console.log(userText)

  if (userText !== '') {
    e.preventDefault()
  // Make a HTTP call to github API
    gitRepo.getRepo(userText).then(data => {
      // Display Results
      // console.log(data.repo)
      ui.showRepo(data.repo)
      

    })
  
  } else {
    //what to do?
    ui.clearProfile()
  }
})