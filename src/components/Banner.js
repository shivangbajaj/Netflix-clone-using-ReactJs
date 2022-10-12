import React, {useEffect,useState} from 'react';
import axios from '../files/axios';
import requests from '../files/requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../css/Banner.css';
const baseUrl = `https://image.tmdb.org/t/p/original`;


function Banner() {
    const [banner, setBanner] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(requests.fetchTrending);
            console.log(result);
            setBanner(
                result.data.results[
                    Math.floor(Math.random()*result.data.results.length - 1)
                ]
            )
        }
        fetchData();
    }, [])
    console.log(banner);
    function truncate(str,n){
        return str?.length>n ? str.substr(0,n-1) + '...': str;
    }
    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
        autoplay: 1,
        }
    }
    const handleClick = (movie) => {
        console.log(movie);
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            console.log(movieTrailer(movie?.title || movie?.name || movie?.original_name || ''))
            movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
            .then((url) => {
                console.log(url);
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
            })
            .catch((error) => console.log(error))
        }
    }
    return (
        <>
        <header className="banner"
        style={{
            backgroundSize:"cover",
            backgroundImage:`url(
                "${baseUrl}${banner?.backdrop_path}"
            )`,
            backgroundPosition:"center center",
        }}>
            <div className="banner-contents">
                <h1 className="banner-title">{banner?.title || banner?.name || banner?.original_name}</h1>
                <div className="banner-buttons">
                    <button className="banner-button"
                    onClick={()=>handleClick(banner)}>Play</button>
                    <button className="banner-button">My List</button>
                </div>
                <h1 className="banner-description">{truncate(banner?.overview,150)}</h1>
            </div>
            <div className="banner-fadeBottom" />
        </header>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </>
    )
}

export default Banner
