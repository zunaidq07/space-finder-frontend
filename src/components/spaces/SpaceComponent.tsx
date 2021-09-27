import React, { Component } from 'react';
import genericImage from '../../assets/images.jpg';
import './SpaceComponent.css';

interface SpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    photoUrl?: string,
    reserveSpace: (spaceId: string) => void
}
export default class SpaceComponent extends Component<SpaceComponentProps>{

    private renderImage(){
        let image: any;
        if(this.props.photoUrl) {
            image = <img src={this.props.photoUrl} alt=''/>
        } else {
            image = <img src={genericImage} alt=''/>
        }
        return image;
    }
    render() {
        return(
            <div className="spaceComponent">
                {this.renderImage()}<br />
                <label className="name">{this.props.name}</label><br />
                <label className="spaceId">{this.props.spaceId}</label><br />
                <label className="location">{this.props.location}</label><br />
                <button onClick={()=>this.props.reserveSpace(this.props.spaceId)}>
                    Reserve space
                </button>
            </div>
        )
    }
}