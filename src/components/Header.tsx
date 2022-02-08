import React from "react";
import {useAuthentication} from "../hooks/authentication-hook";

const Header = () => {
  const {authentication, logout} = useAuthentication();

  return (<>
    <header>
      <h1>La bière c'est la vie</h1>
      {authentication && <div>Bonjour {authentication.username} <button onClick={() => logout()}>Logout</button></div>}
    </header>
  </>)
}

export default Header;