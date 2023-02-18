import './App.css';
import Home from './Components/Home';
import uuid from "react-uuid";
import { useEffect, useState } from 'react';
import {BrowserRouter as  Router,Routes,Route,Link,Navigate} from 'react-router-dom'
import Reg from './Components/Registration';
import Log from './Components/Login';
import { DataContext } from './Components/Ctxt';
import Cart from './Components/Cart';
import Order from './Components/Order';
import Loading from './Components/Loading'

function App() {

  const [pets, setPets] = useState()
  const [isLoad, setIsLoad] = useState(true)
  let initAccounts = [
    {id:1, name: 'User_top', age:18, password: '1234', basket: [], order: []},
    {id:2, name: 'User_sacha', age:18, password: 'blue', basket: [], order: []},
    {id:3, name: 'User_nikita', age:18, password: 'donto', basket: [], order: []}
  ]


  const [accounts, setAccounts] = useState(initAccounts)
  const [user, setUser] = useState(null)




  async function GetPets() {
    setIsLoad(true)
    const api = await fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
    const data = await api.json()
    setPets(data)
    setIsLoad(false)
    console.log(data);
  }
  useEffect(() => {
    GetPets()
  }, [])



    return <Router>
      <header className='header'>
        <nav className='menu'>
          <ul className='list'>
            <li className='elem'>{user !== null ? <p>Доброго времени суток, {user.name}</p> : ''}</li>
            {user !== null ? <><li className='elem'><a className='logout' onClick={() => setUser(null)}>Выйти</a></li> <li className='elem'><Link to='/basket'>Корзина</Link></li></> : <><li className='elem'><Link to='/reg'>Регистрация</Link></li>
            <li className='elem'><Link to='/log'>Войти</Link></li><li className='elem'><Link>Заказ</Link></li></>}
            <li className='elem'><Link to='/' >Главная</Link></li>
          </ul>
        </nav> 
      </header>
      <section className='container'>
      {isLoad ? <Loading/> : 
      <DataContext.Provider value={{user, setUser, accounts, setAccounts, pets}}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/reg' element={user ? <Navigate to="/" /> :  <Reg />} />
            <Route path='/log' element={user ? <Navigate to="/" /> :  <Log />} />
            <Route path='/basket'element={!user ? <Navigate to="/" /> : <Cart />} />
            <Route path='/order'element={!user ? <Navigate to="/" /> : <Order />} />
      </Routes>
      </DataContext.Provider>
      }
      </section>
    </Router>  
}
export default App;
