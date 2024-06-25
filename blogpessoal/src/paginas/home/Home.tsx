import './Home.css'

function Home() {

    return (
        <div className='flexbox text-center'>
            <h1 className='text-3xl font-bold underline text-violet-900'>Home</h1>
            <img className='foto' src='https://c8.alamy.com/comp/DR9PKD/black-guy-showing-thumbs-up-all-on-white-background-DR9PKD.jpg'></img>
            <p className='text-xl'>esse é um home.</p>
                <div className="flex flex-col gap-4 items-center py-4">
                    <h2 className='text-5xl font-bold'>Seja bem vinde!</h2>
                    <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>

                    <div className="flex justify-around gap-4">
                        <button className='rounded bg-white text-blue-800 py-2 px-4'>Ver postagens</button>
                    </div>
                </div>
            </div>
    )
}

export default Home