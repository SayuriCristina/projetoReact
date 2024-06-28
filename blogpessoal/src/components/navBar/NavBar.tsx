import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'



function Navbar() {
    // eslint-disable-next-line prefer-const
    let navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        alert('Usuário deslogado com sucesso')
        navigate('/login')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let navbarComponent


    return (
        <>
            <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
                <div className="container flex justify-between text-lg">
                    <Link to='/home' className='text-2xl font-bold uppercase'>Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <div className='hover:underline'>Postagens</div>
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastroTema' className='hover:underline'>Cadastrar tema</Link>
                        <div className='hover:underline'>Perfil</div>
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar