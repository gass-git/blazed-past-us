import path from 'path'
import posts from '../posts.json'

async function handleInject(postNumber: string): Promise<void> { 
  getPostHtml(postNumber)
    .then(resp => resp.text())
    .then(htmlString => {
      (document.getElementById("root") as HTMLElement).innerHTML = htmlString
    })
    .catch(error => console.error(error))
}


async function getAllPosts(): Promise<Array<any>> {
  const resp = await fetch(`./posts/data.json`)
  const data = await resp.json()
  console.log(data)

  return data
}




async function getPostHtml(n: string): Promise<Response>{
  const file = `post-${n}.html`
  const htmlResp = await fetch(`./posts/${file}`)
  return htmlResp
}

const postsData = await getAllPosts()
router()

async function router(): Promise<void> {
  const pathname = window.location.pathname

  console.log(pathname)

  if (pathname == "/"){
    // show home
    (document.getElementById("root") as HTMLElement).innerHTML = `<h1>Home</h1>`
    // home maps the posts

    postsData.forEach(post => {
      (document.getElementById("root") as HTMLElement).innerHTML += `<h2>${post.title}</h2>`
    })

    return
    // from newer to oldest
  }

  console.log(postExists(pathname.split("/")[1]))

  if (postExists(pathname.split("/")[1])) {
    handleInject(pathname.split("/")[1])
    // check if post with that number exists
    // if yes -> show 
    // if not -> return 404

    return
  }
}


const windowPathName = window.location.pathname.split('/')[1]



function postExists(id: number | string): boolean{
  for (const post of postsData){
    console.log(post)
    console.log(`id argument: ${id}`)
    console.log(`post.id: ${post.id}`)
    if (post.id == id) return true
  }

  return false
}
