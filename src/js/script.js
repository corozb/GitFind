const printName = (storage) => {
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
  const repoRender = async repoSearch => {
    // clear search:
    $displayRepo.innerHTML = ''
    $inputSearch.value = ''
    $errorMessage.innerHTML = ''

    // Template
    await repoSearch.map(item => {
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

      // Favorites

      // const stars = document.querySelectorAll('.star')

      // let repositoryString = JSON.stringify(repository)
      
      // stars.forEach(star => {
      //     star.addEventListener('click', () => {
      //       console.log('click')
      //       // funcion que almacene en el localStorage
      //       localStorage.setItem('repo', repositoryString)
      //   })
      // })
    


      // -----------------
      let favList = []

      function addFavorite() {
        
        let repository = {
          id: item.id,
          repoName: item.name,
          url: item.html_url
        }

        favList.push(repository)
        console.log(favList)
        localStorage.setItem('repository', JSON.stringify(favList))

      }

      // function getFavorites(){
      //   let storeFavorites = localStorage.getItem('repository')
      //   if (storeFavorites == null) {
      //     favList = []
      //   } else {
      //     favList = JSON.parse(storeFavorites)
      //   }
        
      //   return favList
      // }

      function renderFavorites(fList) {
        localStorage.setItem('repository', JSON.stringify(fList))
      }

      const starButton = document.getElementById(item.id)
      const stars = document.querySelectorAll('.star')
      // let repositoryString = JSON.stringify(repository)
      
      stars.forEach(starButton => {
        starButton.addEventListener('click', () => {
          
            console.log('click: ', starButton)
            // funcion que almacene en el localStorage
            addFavorite()
            // localStorage.setItem('id', item.id)
        })
      })
    }

  )
}

