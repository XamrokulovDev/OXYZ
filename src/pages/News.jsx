    import React,{useEffect} from 'react'
    import Header from "../utils/Header";
    import HomeCards from "../components/HomeCards";
    import Form from "../components/Form"

    const News = () => {
        useEffect(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, []);
    return (
        <div>
            <Header />
            <HomeCards />
            <Form/>
        </div>
    )
    }

    export default News