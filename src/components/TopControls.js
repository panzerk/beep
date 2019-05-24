import React from 'react';

function TopControls(props) {
    return (
        <div className="top-controls">
            <div className="top-controls-flex">
                <div>
                    <button className="button-3d">Load 3D Model</button>
                    <button className="button-3d" onClick={props.onResetApp}>Reset</button>
                </div>
                <div>
                    <select className="select-3d" onChange={props.on3DFormatSelect} value={props.chosen_3d_format}>
                        <option value="">Select Format</option>
                        {props.export_3d_formats.map((format) => (
                            <option key={format} value={format} >.{format}</option>
                        ))}
                    </select>
                    <button className="button-3d">Export 3D Model</button>
                </div>
            </div>
        </div >
    )
}

export default TopControls