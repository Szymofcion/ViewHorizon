import React from "react";

const Hero = () => {
    return (
        <section
            className="relative h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1604079625401-b81b240dd42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fG1vdmllfGVufDB8fHx8MTY4NzY5NTQxNQ&ixlib=rb-4.0.3&q=80&w=1080')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="relative z-10 p-8 max-w-md text-white container mx-auto px-4">
                <h1 className="text-5xl font-bold">Featured Movie</h1>
                <p className="mt-4">
                    This is a description of the featured movie. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Nulla euismod,
                    felis id gravida consectetur, nisi justo laoreet leo, non
                    facilisis justo felis in velit.
                </p>
                <div className="mt-6 space-x-4">
                    <button className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200">
                        Play
                    </button>
                    <button className="px-4 py-2 bg-gray-700 font-semibold rounded hover:bg-gray-600">
                        More Info
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
