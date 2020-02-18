import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import profile_image from '../resources/profile_image.png';

const mapStateToProps = state => {
    const participants = state.participants.participants;
    return { participants };
};

class ParticipantsDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <p>Participants</p>
                {this.props.participants
                    ? Object.values(this.props.participants).map((participant, index) => {
                        return (
                            <div className='participant-list'>
                                <div className="circular--portrait">
                                    <img src={participant['headPortrait'] && participant['headPortrait'].length > 0 ? participant['headPortrait'] : profile_image} alt='participant headportait' />
                                </div>
                                <p className='participant-name'>{participant['userName']}</p>
                            </div>
                        )
                    })
                    : null}

            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(ParticipantsDisplay);