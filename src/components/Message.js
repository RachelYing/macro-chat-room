import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Tooltip } from "reactstrap";
import Vote from "../components/Vote";
import dislike from '../resources/dislike.png';
import like from '../resources/like.png';
import profile_image from '../resources/profile_image.png';


const mapStateToProps = state => {
  const selfId = state.participants.selfId;
  return { selfId };
};

class Message extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
    this.renderMyMessge = this.renderMyMessge.bind(this);
    this.renderOthersMessge = this.renderOthersMessge.bind(this);
    this.renderVotes = this.renderVotes.bind(this);

  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <Container>
        {this.props.selfId == this.props.clientId ?
          this.renderMyMessge() :
          this.renderOthersMessge()
        }
      </Container>
    )
  }

  renderMyMessge() {
    return (
      <div className='right-head-portrait-and-message'>

        <div className="right-talk-bubble" id={"TooltipExample" + this.props.message.messageId}>
          <p className="talk-text" >{this.props.message.content}</p>
          {this.renderVotes()}
        </div>
        <div className="circular--portrait">
          <img src={this.props.headPortrait && this.props.headPortrait.length > 0 ? this.props.headPortrait : profile_image} alt='my headportait' />
        </div>
        <Tooltip placement="left" isOpen={this.state.tooltipOpen} autohide={false} target={"TooltipExample" + this.props.message.messageId} toggle={this.toggle}>
          <Vote messageId={this.props.message.messageId} />
        </Tooltip>
      </div>
    );
  }

  renderOthersMessge() {
    return (
      <div className='left-head-portrait-and-message'>
        <div className="circular--portrait">
          <img src={this.props.headPortrait && this.props.headPortrait.length > 0 ? this.props.headPortrait : profile_image} alt='another participant headportait' />
        </div>
        <div className="left-talk-bubble" id={"TooltipExample" + this.props.message.messageId}>
          <p className="talk-text" >{this.props.message.content}</p>
          {this.renderVotes()}
        </div>
        <Tooltip placement="right" isOpen={this.state.tooltipOpen} autohide={false} target={"TooltipExample" + this.props.message.messageId} toggle={this.toggle}>
          <Vote messageId={this.props.message.messageId} />
        </Tooltip>
      </div>
    );
  }


  renderVotes() {
    return (
      this.props.message['thumbUps'].length + this.props.message['thumbDowns'].length > 0 ?
        <div>
          <span className='small-votes'>
            <img className='small-vote-icon' src={like} alt='thumbs up icon' />
          </span>
          <span className='vote-text'>{this.props.message['thumbUps'].length}</span>
          <span className='small-votes'>
            <img className='small-vote-icon' src={dislike} alt='thumbs down icon' />
          </span>
          <span className='vote-text'>{this.props.message['thumbDowns'].length}</span>
        </div>
        : null
    );
  }
}

export default connect(mapStateToProps, null)(Message);
