import { useState } from 'react'
import { NavLink } from 'react-router'

function OffersPage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      This is the OffersPage page
      lorem*10
      <NavLink to="/trades/create-trade">asdfasdf</NavLink>
    </div>
  )
}

export default OffersPage
