import React, { useState, useEffect } from 'react';

interface Character {
    image: any;
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
}

const MyComponent: React.FC = () => {
    const [data, setData] = useState<Character[]>([]);
    const [search, setSearch] = useState('');
    const [index, setIndex] = useState(0);


    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json())
            .then(data => setData(data.results));
    }, []);

    const filteredData = data.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
    );

    const displayedData = filteredData.slice(index, index + 5);

    const handleNextClick = () => {
        setIndex(prevIndex => prevIndex + 5);
    };


    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Suche"
            />
            <button onClick={handleNextClick}>Nächste 5</button>
            {displayedData.length > 0 ? (
                displayedData.map(character => (
                    <div key={character.id}>
                        <p></p>
                        <img src={character.image} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p>Status: {character.status}</p>
                        <p>Species: {character.species}</p>
                        <p>Gender: {character.gender}</p>
                    </div>
                ))
            ) : (
                <p>Keine Charaktere gefunden</p>
            )}
        </div>
    );
};

export default MyComponent;
