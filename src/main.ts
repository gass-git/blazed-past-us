import posts from '../posts.json'

async function handleInject(postNumber: string): Promise<void> { 
  getPostHtml(postNumber)
    .then(resp => resp.text())
    .then(htmlString => {
      (document.getElementById("root") as HTMLElement).innerHTML = htmlString
    })
    .catch(error => console.error(error))
}


async function getAllPosts(){
  const allPosts = await fetch(`./posts.json`)
  console.log(allPosts)
}




async function getPostHtml(n: string): Promise<Response>{
  const file = `post-${n}.html`
  const htmlResp = await fetch(`./posts/${file}`)
  return htmlResp
}


function router(): void {
  const pathname = window.location.pathname

  if (pathname === ""){
    // show home
    (document.getElementById("root") as HTMLElement).innerHTML = `<h1>Home</h1>`
    // home maps the posts
    // from newer to oldest
  }

  if (typeof pathname === "number"){
    handleInject(pathname)
    // check if post with that number exists
    // if yes -> show 
    // if not -> return 404
  }


const windowPathName = window.location.pathname.split('/')[1]
}