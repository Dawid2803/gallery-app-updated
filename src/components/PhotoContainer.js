import React, { Component } from 'react'
import NotFound from './NotFound'

export class PhotoContainer extends Component {
    render() {
        return (
            <div className='photo-container'>
                <h2>Results</h2>
                <ul>
                    <NotFound />
                </ul>
                
            </div>
        )
    }
}

export default PhotoContainer
