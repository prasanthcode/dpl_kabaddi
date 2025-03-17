import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Matches from './Matches';
import axios from 'axios';
import MatchListSkeleton from '../components/MatchListSkeleton';
import Footer from '../components/common/Footer';
import AutoCarousel from '../components/AutoCarousel';

export default function Home() {
    const [showLive, setShowLive] = useState(true); // Initially try live matches
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkLiveMatches = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matches/live`);
                if (Array.isArray(response.data) && response.data.length === 0) {
                    setShowLive(false); // No live matches, switch to completed
                }
            } catch (error) {
                console.error("Error fetching live matches:", error);
            } finally {
                setIsChecking(false);
            }
        };

        checkLiveMatches();
    }, []);

    return (
        <>
            <Navbar />
            <AutoCarousel />

            {/* Wait for the check before rendering */}
            {isChecking ? (
                <MatchListSkeleton isHomePage={true}/>
            ) : showLive ? (
                <Matches url={"live"} />
            ) : (
                <Matches url={"completed"} limit={1} />
            )}
            <div className='gallery'>
                <div className="g_container">
                    <img src="https://res.cloudinary.com/dzvhvgifb/image/upload/v1742019784/Snapinsta.app_484531088_17896190013177542_6012630088360014573_n_1080_vocuxj.webp" alt="" width={"100%"} style={{ margin: "20px auto" }} />
                </div>
                <div className="g_container">
                    <img src="https://res.cloudinary.com/dzvhvgifb/image/upload/v1741931076/main_dpl_poster_Document_A4__11zon_qx9qar.jpg" alt="" width={350} style={{ margin: "0 auto" }} />
                </div>
            </div>
            <Footer/>
        </>
    );
}
