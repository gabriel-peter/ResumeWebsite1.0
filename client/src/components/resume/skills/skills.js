import React, { Component } from 'react';
import '../resume.css';

class Skills extends Component {
    constructor(){
        super();
        this.state = {
            internships: [],
            visibility: true,
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
        
    }
    
    toggleVisibility() {
        this.setState(state => ({
        visibility: !state.visibility,
        }));
    }
    render() {
        const style={paddingTop: 20};
        if (this.state.visibility) {
            return (
                <div>
                    <div className='menu-tab-div'>
                        <button className='menu-tab-button' onClick={this.toggleVisibility}>Skills</button>
                        <img className='open-menu-arrow' src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                    </div>
                    <div className='skill-category'>
                        <div className='skill'>
                            <h4>Frameworks</h4>
                            <img src={'/logo192.png'} style={style} alt={''} height={100}/>
                            <img src={'/images/nodejs-new-pantone-black.png'} style={style} alt={''} height={150}/>
                            <img src={'/images/flask.png'} style={style} alt={''} height={150}/>
                        </div>
                        <div className='skill'>
                            <h4>Languages</h4>
                            <img src={'https://www.python.org/static/community_logos/python-logo-generic.svg'} alt={''} height={100} />
                            <img src={'/images/js-logo.png'} style={style} alt={''} width={100} height={100} />
                            <img src={'/images/cpp_logo.png'} style={style} alt={''} width={100} height={100} />
                            <img src={'/images/swift.png'} style={style} alt={''} height={150} />
                        </div>
                        <div className='skill'>
                            <h4>Hardware</h4>
                            <img src={'/images/3DS_BRAND_ICONS_RGB_SOLIDWORKS.png'} style={style} alt={''} height={150}/>
                            <img src={'/images/autocad.png'} style={style} alt={''} height={50}/>
                            <img src={'/images/arduino.png'} style={style} alt={''} height={125}/>
                        </div>
                    </div>
                </div>
            );
            } else {
              return (
                <div className='menu-tab-div'>
                    <button className='menu-tab-button' onClick={this.toggleVisibility}>Skills</button>
                    <img src='/images/arrow.png' height='20' width='20' alt='arrow'/>
                </div>
              );
            }
    }
}

export default Skills;