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

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json())
            .then(data => setData(data.results));
    }, []);

    const filteredData = data.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Suche"
            />
            {filteredData.length > 0 ? (
                filteredData.map(character => (
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
