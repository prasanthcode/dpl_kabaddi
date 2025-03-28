import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import profilePic from '../assets/pngegg (30).png';
import Navbar from '../components/common/Navbar';
import TeamInfoSkeleton from '../components/TeamInfoSkeleton';
import Footer from '../components/common/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default function TeamInfo() {
  const { id } = useParams();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/players/${id}`);
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching Players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [id]);

  return (
    <div>
      <Navbar />
      {loading ? <TeamInfoSkeleton /> : (<><h2 className="">{players[0].team.name}</h2>

        <div className="match_container teams">
          <div className="d_match" >
            {players.map((player, index) => (
               <Link style={{textDecoration:"none",color:"white"}} to={`/player/${player._id}`} >
             
              <div className="single_match" key={index}>
                <div className="img_wrap">
                  <img src={player.profilePic === "" ? profilePic : player.profilePic} alt="" />

                  <div className="team_1">
                    <h3 className="">
                      {player.name} {player.order === 1 && `(C)`}
                    </h3>
                    


                  </div>
                                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                </div>


              </div>
              </Link>

            ))}

          </div>
        </div></>)}

      <Footer />


    </div>
  )
}
