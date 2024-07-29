import React from "react";

const MovieRows = () => {
    return (
        <div>
            <section className="p-8 container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">Popular on Netflix</h2>
                <div className="flex overflow-x-scroll space-x-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex-none w-64">
                            <img
                                src="https://via.placeholder.com/256x144"
                                alt="Movie Thumbnail"
                                className="rounded"
                            />
                        </div>
                    ))}
                </div>
            </section>
            <section className="p-8">
                <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
                <div className="flex overflow-x-scroll space-x-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex-none w-64">
                            <img
                                src="https://via.placeholder.com/256x144"
                                alt="Movie Thumbnail"
                                className="rounded"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MovieRows;
