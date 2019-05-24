/*This functional component is used for testing the ouptut of applicaiton (App.js) state
changes. It can be placed in the page as a test. */

import React from 'react';

function AppStateCheck(props) {
    return (
        <div>
            <p>Application State Checker (Troubleshooting/Remove in Final!)</p>
            <p>Chosen Engraved Text: {props.app_states.chosen_engraved_text}</p>
            <p>Chosen Case Colour: {props.app_states.chosen_case_colour}</p>
            <p>Chosen Phone Case: {props.app_states.chose_phone_case}</p>
            <p>Chosen Save 3D Format: {props.app_states.chosen_export_3d_format}</p>

        </div>
    )
}

export default AppStateCheck;