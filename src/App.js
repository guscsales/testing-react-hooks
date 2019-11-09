import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(
                'https://api.github.com/users/salesgu/repos'
            );

            setRepos(data);
        };

        getData();

        return () => alert('Component Will Unmount!!');
    }, []);

    useEffect(() => {
        const favoriteRepos = repos.filter(repo => repo.favorite);

        document.title = `You have ${favoriteRepos.length} favorite repos! :)`;
    }, [repos]);

    const handleFavorite = id => {
        const newRepos = repos.map(repo =>
            repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
        );

        setRepos(newRepos);
    };

    return (
        <>
            <ul>
                {repos.map(({ id, name, favorite }) => (
                    <li key={id}>
                        <button onClick={() => handleFavorite(id)}>
                            Toggle Favorite
                        </button>{' '}
                        {id} - {name} -{' '}
                        <strong>{favorite && 'Is Favorite Repo!'}</strong>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default App;