import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import ContactUs from '../components/ContactUS';
import Footer from '../components/Footer';
import ImpactStats from '../components/ImpactStats';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Campaigns from '../components/Campaigns';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <ImpactStats></ImpactStats>
            <Campaigns></Campaigns>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;