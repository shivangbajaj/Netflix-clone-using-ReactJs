import React, { useState, useEffect } from 'react';
import axios from '../files/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../css/Rows.css'

const baseUrl = `https://image.tmdb.org/t/p/original`

function Rows({ title, fetchURL,isLarge }) {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovie(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchURL])
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
        <div className="rows">
            <h3>{title}</h3>
            <div className="poster-row">
                {movie.map(movi => {
                    return (
                        <img 
                        onClick={()=>handleClick(movi)}
                        className={`poster ${isLarge && "large-poster"}`}
                        src={`${baseUrl}${isLarge?movi.poster_path:movi.backdrop_path}`} 
                        alt={movi?.title || movi?.name || movi?.original_name} 
                        key={movi.id} />
                    )
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Rows
