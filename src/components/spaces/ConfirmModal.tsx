import { Component } from "react";
import './ConfirmModal.css';

interface ConfirmModalProps {
    show: boolean,
    content: string,
    close: () => void
}
export default class ConfirmModal extends Component<ConfirmModalProps> {
    render(){
        if(!this.props.show){
            return null
        }else{
            return(
                <div className="modal">
                    <div className="modalContent">
                        <h1>You tried to reserve a space...</h1>
                        <h3 className="modalText">{this.props.content}</h3>
                        <button onClick={()=>this.props.close()}>Ok, Close</button>
                    </div>
                </div>
            )
        }
    }
}