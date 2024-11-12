import React, { useEffect, useState } from "react"
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom"
const Player =()=>
{
    const {id} =useParams()
    const navigate = useNavigate()


    const [apiData,setApiData] =useState({
        name:"",
        key:"",
        published_at:"",
        typeof:""

    })
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGY5MjJmNzExMzlmMGYzZjY1NDhkYzgxM2E5MTdkNSIsIm5iZiI6MTczMDQzODE2OS42MTg4NDMzLCJzdWIiOiI2NzI0NWY2OWNiNTQ4YjcxNmE4MjQwZjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TtpO-x11Avm3CVscZmYkzBrZxEpQffe2_9vgrNzVO-A'
        }
      };
      
      useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));

      },[])

      


    return(
        <div className="player">
            <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
            <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width='90%' height='90%' frameborder="0" allowFullScreen title="trailer"></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.typeof}</p>
            </div>

        </div>
    )
}
export default Player