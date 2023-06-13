import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import './Navigation.scss';
import {UserContext} from "../../Context/UserContext.jsx";


const Navigation = () => {
    const {userAddress, handleLogin, handleLogout} = useContext(UserContext);
    console.log(userAddress);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <span> SecureVault</span>
                </Link>
                <div className='nav-links-container'>
                    {userAddress.length !== 0 && <Link className='nav-link'> User: {userAddress}</Link>}


                    {userAddress.length === 0 ?
                        <Link className='nav-link' onClick={() => handleLogin()}>
                            Sign in
                        </Link>
                        : (
                            <div>
                                <Link className='nav-link' to='/AddVault'>
                                    Add Vault
                                </Link>

                                <Link className='nav-link' to='/Vault'>
                                    Vault
                                </Link>

                                <Link className='nav-link' to='/' onClick={() => handleLogout()}>
                                    Sign out
                                </Link>
                            </div>

                        )}

                </div>
            </div>
            <Outlet/>
        </Fragment>
    )

};

export default Navigation;