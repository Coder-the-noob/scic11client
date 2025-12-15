import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import ContactUs from '../components/ContactUS';
import Footer from '../components/Footer';
import ImpactStats from '../components/ImpactStats';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <ImpactStats></ImpactStats>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;