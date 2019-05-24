import React, { Component } from 'react';
import Header from './components/Header'
import LoadControl from './components/LoadControl'
import ExportControl from './components/ExportControl'
import ResetControl from './components/ResetControl'
import Main3DView from './components/Main3DView'
import TextEngraving from './components/TextEngraving'
import CaseColourPicker from './components/CaseColourPicker'
import CaseSelection from './components/CaseSelection'

class App extends Component {
    /* Constructor */
    constructor(props) {
        super(props)

        /* App state*/
        this.state = {
            chosen_engraved_text: '',
            chosen_case_colour: '#44557E',
            chosen_phone_case: 'iPhone-X',
            chosen_export_3d_format: '',
            chosen_3d_file_to_load: 'Something is wrong if this text displays',
            chosen_3d_file_extension: '',
            available_export_3d_formats: ['STL', 'OBJ', 'AFM', '3FM'],
            available_case_models: ['iPhone-X', 'iPhone-8-Plus', 'iPhone-7', 'iPad-9.7', 'Galaxy-S10', 'Galaxy-S5', 'Pixel2XL'],
        }

        /* section to bind functions to local class context */
        this.update3DExportFormat = this.update3DExportFormat.bind(this)
        this.updateEngravingText = this.updateEngravingText.bind(this)
        this.updateCaseColour = this.updateCaseColour.bind(this)
        this.updateChosenCase = this.updateChosenCase.bind(this)
        this.updateChosen3DFileToLoad = this.updateChosen3DFileToLoad.bind(this)
        this.resetApp = this.resetApp.bind(this)

    }
    /* Updates chosen_export_3d_format App state property based on return
     event target value*/
    update3DExportFormat(e) {
        this.setState({ chosen_export_3d_format: e.target.value })
    }
    /* Resets App to chosen default values (empty) */
    resetApp() {
        this.setState({
            chosen_engraved_text: '',
            chosen_case_colour: '#44557E',
            chosen_export_3d_format: '',
            chosen_phone_case: 'iPhone-X',
        })
    }

    updateEngravingText(e) {
        this.setState({ chosen_engraved_text: e.target.value })
    }

    updateCaseColour(color) {
        this.setState({ chosen_case_colour: color.hex })
    }

    updateChosenCase(e) {
        this.setState({ chosen_phone_case: e })
    }

    updateChosen3DFileToLoad(file, fileExtension, color) {
        this.setState({ chosen_phone_case: file })
        this.setState({ chosen_3d_file_extension: fileExtension })
        console.log('updateChosen3DFileToLoad: ' + color+file+ fileExtension+ color)
        console.log('.......')
        console.log(color)
        console.log('.......')
        if(color==='#GGGGGG'){

        }
        else{
            this.setState({ chosen_case_colour: color })
        }
    }

    /* App JSX render section. Works together with index.css in
     producing a layout (based on grid css*/
    render() {
        return (
            <div className="app" >
                <Header />
                <div className="top-controls">
                    <LoadControl on3DFileLoad={this.updateChosen3DFileToLoad} />
                    <ResetControl onResetApp={this.resetApp} />
                    <ExportControl
                        export_3d_formats={this.state.available_export_3d_formats}
                        chosen_3d_format={this.state.chosen_export_3d_format}
                        on3DFormatSelect={this.update3DExportFormat}
                        app_states={this.state}
                    />
                </div>
                <div className="view3d">
                    <CaseSelection
                        onCaseSelect={this.updateChosenCase}
                        case_list={this.state.available_case_models}
                    />
                    <Main3DView app_states={this.state} />
                </div>
                <div className="edit-controls">
                    <TextEngraving
                        engraved={this.state.chosen_engraved_text}
                        onEngraveTextChange={this.updateEngravingText}
                    />
                    <CaseColourPicker
                        onCaseColourSelect={this.updateCaseColour}
                        updated_case_colour={this.state.chosen_case_colour}
                    />
                </div>
            </div >
        );
    }
}

/* Export App */
export default App;
