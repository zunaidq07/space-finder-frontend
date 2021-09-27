import React, { Component } from "react";
import { Space } from '../../model/Model'
import { DataService } from "../../services/DataService";
import SpaceComponent from "./SpaceComponent";
import ConfirmModal from './ConfirmModal';

interface SpacesState {
    spaces: Space[],
    showModal: boolean,
    modalContent: string
}

interface SpacesProps {
    dataService: DataService
}


export default class Spaces extends Component<SpacesProps, SpacesState>{
    constructor(props: SpacesProps) {
        super(props);
        this.state = {
            spaces: [],
            showModal: false,
            modalContent: ''
        }
        this.reserveSpace = this.reserveSpace.bind(this);
        this.close = this.close.bind(this);
    }

    async componentDidMount(){
        const spaces = await this.props.dataService.getSpaces();
        this.setState({
            spaces: spaces
        })
    }

    private async reserveSpace(spaceId: string){
        const reservationResult = await this.props.dataService.reserveSpace(spaceId);
        if (reservationResult) {
            this.setState({
                showModal: true,
                modalContent: `You reserved a space with id ${spaceId} with the reservation number ${reservationResult}`
            })
        }else {
            this.setState({
                showModal: true,
                modalContent: `You can't reserve a space with id ${spaceId}`
            })
        }
    }

    private renderSpaces() {
        let rows: any[]= [];
        for (const space of this.state.spaces) {
            rows.push(
                <SpaceComponent 
                    key={space.spaceId}
                    location={space.location}
                    spaceId={space.spaceId}
                    name={space.name}
                    reserveSpace={this.reserveSpace}
                />
            )
        }
        return rows;
    };
    private close() {
        this.setState({
            showModal: false,
            modalContent: ''
        })
    }
    render(){
        console.log('inside space comopnent')
        return(
            <div>
                <h2>Welcome to the space page</h2>
                {this.renderSpaces()}
                <ConfirmModal 
                    close={this.close} 
                    content={this.state.modalContent} 
                    show={this.state.showModal}
                />
            </div>
        )
    }
}