import React, { Component } from 'react';
import '../resume.css';

class Skills extends Component {
    constructor(){
        super();
        this.state = {
            internships: [],
            visibility: false,
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        this.setState(state => ({
        visibility: !state.visibility,
    }));
    }

    componentDidMount(){
        // fetch('/api/customer')
        // .then(res => res.json())
        // .then(customers => this.setState({customers},
        //     () => console.log('Customers fetched...', customers)))
    }

    render() {
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
                            <img src={'/logo192.png'} alt={''} height={100}/>
                            <img src={'/images/nodejs-new-pantone-black.png'} alt={''} height={100}/>
                        </div>
                        <div className='skill'>
                            <h4>Languages</h4>
                            <img src={'https://www.python.org/static/community_logos/python-logo-generic.svg'} alt={''} height={100} />
                            <img src={'/images/js-logo.png'} alt={''} width={100} height={100} />
                            <img src={'/images/cpp_logo.png'} alt={''} width={100} height={100} />
                        </div>
                        <div className='skill'>
                            <h4>Hardware</h4>
                            <img src={'/images/3DS_BRAND_ICONS_RGB_SOLIDWORKS.png'} alt={''} height={150}/>
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