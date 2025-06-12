import React, { useEffect } from 'react'; 
import Header from "../utils/Header";
import HomeCards from "../components/HomeCards";
import Article from '../components/Article';

const Articles = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div>
            <Header />
            <Article />
            <HomeCards />
        </div>
    );
};

export default Articles;