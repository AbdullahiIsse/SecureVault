import './App.css'
import {Route, Routes} from "react-router-dom";
import Navigation from "./Pages/Navigation/Navigation.jsx";
import Home from "./Pages/Home/Home.jsx";
import Vault from "./Pages/Vault/Vault.jsx";
import AddVault from "./Pages/AddVault/AddVault.jsx";

function App() {

    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path='vault' element={<Vault/>}/>
                <Route path='AddVault' element={<AddVault/>}/>
            </Route>
        </Routes>
    )
}

export default App
