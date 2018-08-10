import React, {Component} from 'react';
import '../Gaya/latestvisitor.css';
import moment from 'moment';

export default class LatestVisitor extends Component {
  render(){
    return(
      <div className='table-container'>
        <div className='table-wrapper'>
          <div className='table-title-holder'>
            <h1 className='table-title'>20 Recent Visitor</h1>
          </div>
          <div className='visitor-looper'>
            {
              this.props.data.map((x, i) =>
              <div key={i} className='visitor-content'>
                <div className='visitor-inf'>
                  <div className='visitor-img-holder'>
                    <img className='visitor-img' alt='visitor' src={x.image} />
                  </div>
                  <div className='visitor-name-stack-time'>
                    <div className='visitor-name-via'>
                      <p className='visitor-name'>{x.name}</p>
                      <p className='visitor-via'>- via {x.provider}</p>
                    </div>
                    <p className='visitor-date'>{moment(Number(x.id)).format('MMM DD \'18 - HH:mm')}</p>
                  </div>
                </div>
              </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
