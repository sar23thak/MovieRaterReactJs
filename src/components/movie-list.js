import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import API from "../api-service";
import { useCookies } from "react-cookie";

function MovieList(props) {

    // const [token] = useCookies(['mr-token'])
    const [token] = useCookies(['mr-token']);

    const movieClicked = movie=> evt => {
        props.movieisClicked(movie)
    }

    const editClicked = movie =>{
      props.editClicked(movie);
    }
    const removeclicked = movie =>{
      API.deleteMovie(movie.id, token['mr-token'])
        .then(props.removeClicked(movie))
        .catch(error => console.log(error))
    }

    return(
        <div>
            {props.movies && props.movies.map(movie =>{
              return(
                <div key = {movie.id}>
                    <h3 onClick={movieClicked(movie)}>{movie.title}</h3>
                    <FontAwesomeIcon icon={faEdit} onClick={()=> editClicked(movie)} />
                    <FontAwesomeIcon icon={faTrash} onClick = {() => removeclicked(movie)} />
                </div>
              )
            })}
        </div>
    )
}


export default MovieList