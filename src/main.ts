// >> the title of the post will be the name of the file.

const root = document.getElementById("root") as HTMLElement;
const postsDataPath = `./posts/data.json`

async function getAllPosts(): Promise<Array<{id: string, title: string}>> {
  const resp = await fetch(postsDataPath)
  const data = await resp.json()
  const mappedData = data.map(
    (post: {id: Number; title: String}) => { 
      return {...post, id: post.id.toString() }
    }
  )

  return mappedData
}

const postsData = await getAllPosts()

function renderHome(): void {
  root.innerHTML = `<h1>Home</h1>`
  postsData.forEach(post => {
    root.innerHTML += `<h2>${post.title}</h2>`
  })
}

function renderPost(id: string): void {
  injectPost(id)
}

function render404(): void{
  root.innerHTML = `<h1>404 not found</h1>`
}

async function router(): Promise<void> {
  const pathname = window.location.pathname

  if (pathname === "/"){
    renderHome()
    return
  }
  else if (postExists(pathname.split("/")[1])) {
    renderPost(pathname.split("/")[1])
    return
  }
  else {
    render404()
  }
}

router()

async function injectPost(postId: string): Promise<void> {
  getPostHtml(postId)
    .then(resp => resp.text())
    .then(htmlString => root.innerHTML = htmlString)
    .catch(error => console.error(error))
}

async function getPostHtml(postId: string): Promise<Response>{
  const title = postsData.find(post => post.id === postId)?.title

  const file = `${title}.html`
  const htmlResp = await fetch(`./posts/${file}`)

  return htmlResp
}

function postExists(id: string): boolean{
  return postsData.some(post => post.id === id)
}

export {}