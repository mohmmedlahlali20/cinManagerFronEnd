import { useState } from 'react';


function FirstPage() {
    const [querySearch, setQuerySearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", querySearch);
    };
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <section className="relative bg-teal-600">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-5xl font-bold mb-4 animate-fadeInUp">
                        Welcome to MovieTime
                    </h1>
                    <p className="text-lg mb-8 animate-fadeInUp delay-200">
                        Find your next favorite movie here!
                    </p>
                    <div className="flex justify-center items-center animate-fadeInUp delay-400">
                        <form onSubmit={handleSearch} className="relative w-full max-w-lg">
                            <input
                                type="text"
                                className="w-full px-6 py-3 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-400"
                                placeholder="Search for movies..."
                                value={querySearch}
                                onChange={(e) => setQuerySearch(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 mt-1 mr-1 p-2 bg-teal-600 rounded-full hover:bg-teal-700 transition duration-200"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Movies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Card 1 */}
                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 1</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>

                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 2</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 3</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>

                        <div
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img
                                src="https://via.placeholder.com/300x400"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">Movie Title 4</h3>
                                <p className="text-gray-400">Description of the movie goes here. It&#39;s an amazing
                                    movie!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default FirstPage;