/*This component embeds the colour wheen into the page (color-picker module). 
onChangeComplete={props.onCaseColourSelect} updates the chosen_case_colour state*/

/* example take from https://casesandberg.github.io/react-color/ and modified*/

import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

class CaseColourPicker extends React.Component {
    state = {
        displayColorPicker: false,
        color: this.props.updated_case_colour
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({
            color: color
        })
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '30px',
                    height: '14px',
                    borderRadius: '2px',
                    background: this.props.updated_case_colour,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <p>Select Case Colour:</p>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <ChromePicker
                        disableAlpha={true}
                        width="190"
                        onChange={this.handleChange}
                        color={this.props.updated_case_colour}
                        onChangeComplete={this.props.onCaseColourSelect}
                    >
                    </ChromePicker>
                </div> : null}

            </div>
        )
    }
}

export default CaseColourPicker