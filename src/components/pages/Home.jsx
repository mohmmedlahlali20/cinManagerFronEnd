import { useOutletContext} from 'react-router-dom';
import { useState  } from 'react';
import { Button } from '../UI/index.jsx';


function Home() {
    const { searchTerm = '' } = useOutletContext();





    const allMovies = [
        {
            id: 1,
            title: 'Film 1',
            image: 'https://via.placeholder.com/200x300',
            description: 'Description du film 1.',
        },
        {
            id: 2,
            title: 'Film 2',
            image: 'https://via.placeholder.com/200x300',
            description: 'Description du film 2.',
        },
        {
            id: 3,
            title: 'Film 3',
            image: 'https://via.placeholder.com/200x300',
            description: 'Description du film 3.',
        },
    ];

    const [movies] = useState(allMovies);

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Films en Vedette</h2>

            {filteredMovies.length === 0 ? (
                <p className="text-center text-gray-500">No results found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {filteredMovies.map((movie) => (
                        <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{movie.title}</h3>
                                <p className="text-gray-600">{movie.description}</p>
                                <Button className="mt-2 bg-teal-600 text-white py-2 px-4 rounded">
                                    Voir Détails
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
