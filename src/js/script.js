const printName = () => {
  const $name = document.getElementById('textbox').value
  console.log($name)
  localStorage.setItem('username', $name)
}

const $users = document.querySelectorAll('.nickname')
$users.forEach(user => {
  user.innerHTML = localStorage.getItem('username')
})



// --------------------------------------
const $inputSearch = document.querySelector('.inputForm')
const API_URL = `https://api.github.com/search/repositories?`
const $displayRepo = document.querySelector('.displayRepo')
const $favorites = document.querySelector('.favorites')

const $errorMessage = document.querySelector('.errorMessage')


// text input value
$inputSearch.addEventListener('submit', (e) => {
  e.preventDefault()
  
  let $searchText = document.querySelector('.inputSearch').value
  console.log($searchText)
  
  if ($searchText !== '') {
     fetch(`${API_URL}q=${$searchText}&sort=stars&order=desc`)
      .then(response => response.json())
      .then(data => 
        data.message === 'No Found' || data.status === 404 ? 
        showError('User not Found!') :
        repoRender(data.items))
        .catch(error => console.log(error))
      }
      else {
        showError('Que repositorio deseas buscar?')
      }
    })
    

  const showError = errorMessage => { 
    $displayRepo.innerHTML = '' 
    $inputSearch.value = ''
    $errorMessage.innerHTML = errorMessage;
  }

    // Render Query Repository
  const repoRender = repoSearch => {
    // clear search:
    $displayRepo.innerHTML = ''
    $inputSearch.value = ''
    $errorMessage.innerHTML = ''

    // Template
   repoSearch.map(item => {
      $displayRepo.innerHTML += `    
      <div class="container-box">
        <h3>${item.name}</h3>
        <hr>
        <p>${item.description}</p>
        <p>cantidad estrellas: <span>${item.stargazers_count}</span></p>
        <a href="${item.html_url}"# target="_blank">Visitar Repo</a>
        <a id=${item.id} class="star">😛</a>
      </div>
      `
  }

    
  )

  repoSearch.map(item => {
    const starButton = document.getElementById(item.id)
    starButton.addEventListener('click', () => {
      starButton.classList.add('selected') 
      addFavorite(item)
    })

  })
}

let favList = []

function getFavorites() {
  let listParse = JSON.parse(localStorage.getItem('repository'))
  if ( listParse == null ) {
    favList = []
  } else {
    favList = listParse
    
    // Template
    favList.map(item => {
      $favorites.innerHTML += `    
      <div class="container-favorite">
        <h3>A <span class="nickname">Cristian</span> le gusta</h3>
        <hr>
        <h3><a href="${item.html_url}" target="_blank">${item.name}</a></h3>
      </div> 
      `
  
      const $users = document.querySelectorAll('.nickname')
      $users.forEach(user => {
        user.innerHTML = localStorage.getItem('username')
      })
      
    }) 

    // removeItem

  }

}

function addFavorite(item) {

  const repository = {
    id: item.id,
    name: item.name,
    url: item.html_url
  }

  favList.push(repository)
  localStorage.setItem('repository',  JSON.stringify(favList))
  console.log(localStorage)
  
}

getFavorites()





//que agrege sin necesita de actualizar página
// no repita elementos
// remover elementos con icono flor