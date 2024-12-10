import {useState, useRef } from 'react'
import './style.css'
import logo from './assets/logo.png';
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()
const inputSenha = useRef()


  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers (usersFromApi.data)
    console.log(users)
  }

  async function createUsers(){
    
    try {
      // Envia os dados para o backend
      const response = await api.post('/user', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
        password: inputSenha.current.value
      });
  
      // Sucesso
      alert('Usuário criado com sucesso!');
    } catch (error) {
      // Erro no backend ou na requisição
      const errorMessage = error.response?.data?.msgUser || 'Erro ao criar usuário. Verifique os dados e tente novamente.';
      
      // Exibe o erro na tela
      alert(errorMessage);
    }
  }

  async function deleteUsers(id){
    await api.delete(`usuarios/${id}`);


   getUsers()
  }  
  
  // useEffect(() => {
  //   getUsers()
  // }, [])
  
  
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName}/>
        <input placeholder="Idade" name='idade' type='number' ref={inputAge}/>
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail}/>
        <input placeholder="Senha" name='Senha' type='text' ref={inputSenha}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={logo} alt="Logo" style={{ width: '30px', height: '30px' }} />
          </button>
        </div>
      ))}

    </div>

  )
}

export default Home