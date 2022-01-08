import React from 'react'

//format for url from flickr
    // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

const Photo = ({ server, id, secret, title}) => {
    return (
        <li>
           <img src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`} alt={title}/> 
        </li>
    )
}

export default Photo
