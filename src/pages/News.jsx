    import React,{useEffect} from 'react'
    import Header from "../utils/Header";
    import HomeCards from "../components/HomeCards";
    import Form from "../components/Form"
    import HelmetPage from "../utils/Helmet";

    const News = () => {
        useEffect(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);
    return (
        <>
            <HelmetPage />
            <Header />
            <HomeCards />
            <Form/>
        </>
    )
    }

    export default News