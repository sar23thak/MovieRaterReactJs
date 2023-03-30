import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

function MovieDetails(props){

    const [highlighted, setHighlighted] = useState(-1);
    
    const [token] = useCookies(['mr-token']);

    // const [mov, setMovie] = useState(props.movie);
    let mov = props.movie

    const highlightRate = high => evt=>{
        setHighlighted(high)
    }

    const rateClicked = rate => evt =>{
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/rate_movie/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
        },
        body :JSON.stringify( {stars: rate +1} )
        })
        // .then( () => console.log('clicked'))
        .then( () => getdetails())
        .catch(error => console.log(error))
    }

    const getdetails = () =>{
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`
        }
        })
        .then(resp => resp.json())
        .then(resp => props.movies)
        // .then(()=> MovieDetails(props.movie))
        // .then(()=> console.log('clicked in moviedetail'))
        .catch(error => console.log(error))
    }
    return(
        <div>
            {mov ? (
                <div>
                    <h2>{props.movie.title}</h2>
                    <p>{props.movie.description}</p>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating >0 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating >1 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating >2 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating >3 ? "orange" : ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating >4 ? "orange" : ''}/>
                    ({props.movie.no_of_ratings})
                    <div className="rate-container">
                        <h3>Rate it</h3>
                        {
                            [...Array(5)].map((e, i) =>{
                                return <FontAwesomeIcon key={i} icon={faStar} className={highlighted >= i ? "purple" : ''}
                                        onMouseEnter= {highlightRate(i)}
                                        onMouseLeave={highlightRate(-1)}
                                        onClick={rateClicked(i)}
                                />
                            })
                        }
                    </div>
                </div>
            ): null}
        </div>
    )
}

export default MovieDetails