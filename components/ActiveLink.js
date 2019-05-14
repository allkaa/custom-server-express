import { withRouter } from 'next/router'
// To inject the pathname, query or asPath in your component, you can use withRouter.

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

const ActiveLink = ({ children, router, href }) => {
  console.log('ActiveLink href:')
  console.log(href);
  console.log('ActiveLink router object:')
  console.log(router)
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'blue'
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)
