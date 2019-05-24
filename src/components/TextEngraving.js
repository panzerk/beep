/* This component controls the input of the engraving text for the chosen case.
 onChange={props.onEngraveTextChange} updates the chosen_engraved_text in App.js*/

import React from 'react';

function TextEngraving(props) {
    return (
        <div>
            <div>
                <label htmlFor="text-to-engrave">
                    <p>What to engrave into case?</p>
                </label>
                <input
                    id="text-to-engrave"
                    className="search-3d"
                    onChange={props.onEngraveTextChange}
                    value={props.engraved} placeholder="Text to Engrave"
                />
            </div>
        </div>
    )

}

export default TextEngraving