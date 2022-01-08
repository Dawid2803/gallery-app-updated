import React, { Component } from 'react'

import NotFound from './NotFound'
import Photo from './Photo'

export class PhotoContainer extends Component {

    state= {
        searchedGallery: []
    }



    render() {


        return (
            <div className='photo-container'>
                <h2>{this.props.results}</h2>
                <ul>{this.props.galleryData.map(photo => 
                        <Photo 
                            server={photo.server}
                            id={photo.id}
                            secret={photo.secret}
                            title={photo.title}
                            key={photo.id}
                        />
                    )}
                </ul>
                
            </div>
        )
    }
}

export default PhotoContainer
