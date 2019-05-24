/*This component controls the 3D export format selection and export action.
onChange={props.on3DFormatSelect} updates App.js chosen_export_3d_format value*/

import React from 'react';
//import ReactFileReader from 'react-file-reader'
//import { saveAs } from 'file-saver';
var AdmZip = require('adm-zip');



class ExportControl extends React.Component {
    //constructor(props) {
    //    super(props)
    //}


    obj_parse(obj_text) {

        let lines = obj_text.split('\n')
    
        let result = {}
        let i = 0
        let mtllib_line = ''
        let usemtl_line = ''
    
        while(i<lines.length){
            while(i<lines.length){
                if(lines[i]===undefined){
                    break
                }
                if(lines[i].startsWith('mtllib')){
                    mtllib_line = lines[i]
                    break
                }
                else{
                    i++
                    continue
                }
            }
            if(mtllib_line!==-1){
                while(i<lines.length){
                    if(lines[i]===undefined){
                        break
                    }
                    if(lines[i].startsWith('usemtl')){
                        usemtl_line = lines[i]
                        break
                    }
                    else{
                        i++
                        continue
                    }
                }
            }
            else{
                break
            }
            if(mtllib_line.length!==0 && usemtl_line.length!==0){
                result['mtllib_line'] = mtllib_line
                result['usemtl_line'] = usemtl_line
                return result
            }
            else{
                return result
            }
        }
        return result
    }

    handle_data(data, obj_parse_pointer, this_pointer, file_name) {

        let obj_info = obj_parse_pointer(data)

        console.log(obj_info)

        let is_empty = Object.entries(obj_info).length === 0 && obj_info.constructor === Object

        let obj_file_name = file_name
        let mtl_file_name = ''
        let material_name = ''

        if(!obj_file_name.endsWith('.obj')){
            obj_file_name = obj_file_name + '.obj'
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        if(!is_empty){
            console.log(obj_info.mtllib_line)
            console.log(obj_info.usemtl_line)
            //mtllib iPhoneX.stl.obj.mtl
            //usemtl DefaultMaterial
            console.log(this_pointer.props.app_states.chosen_case_colour)
            mtl_file_name = obj_info.mtllib_line.split('mtllib')[1].trim()
            material_name = obj_info.usemtl_line.split('usemtl')[1].trim()
            var zip = new AdmZip();
            var content = data;
            zip.addFile(obj_file_name, Buffer.alloc(content.length, content), "");
            let mtl_content = ''
            mtl_content+='newmtl '
            mtl_content+=material_name
            mtl_content+='\n'
            mtl_content+='Ns 225.000000\n'
            mtl_content+='Ka 1.000000 1.000000 1.000000\n'
            mtl_content+='Kd '//0.800000 0.777799 0.285769\n'
            let rgb = hexToRgb(this_pointer.props.app_states.chosen_case_colour)
            mtl_content+=(''+rgb.r/255).substr(0, 8)
            mtl_content+=' '
            mtl_content+=(''+rgb.g/255).substr(0, 8)
            mtl_content+=' '
            mtl_content+=(''+rgb.b/255).substr(0, 8)
            mtl_content+='\n'
            mtl_content+='Ks 0.500000 0.500000 0.500000\n'
            mtl_content+='Ke 0.0 0.0 0.0\n'
            mtl_content+='Ni 1.450000\n'
            mtl_content+='d 1.000000\n'
            mtl_content+='illum 2\n'
            zip.addFile(mtl_file_name, Buffer.alloc(mtl_content.length, mtl_content), "")

            var FileSaver = require('file-saver');
            var file = new File([zip.toBuffer()], "packed.zip", {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(file);

        }

    }

    clickHandler() {
        //var FileSaver = require('file-saver');
        //console.log(this.props.app_states.chosen_phone_case)
        //var file = new File([this.props.app_states.chosen_phone_case], "exported.obj", {type: "text/plain;charset=utf-8"});
        //FileSaver.saveAs(file);
        var obj_text = ''

        var handle_data_pointer = this.handle_data
        var obj_parse_pointer = this.obj_parse
        var this_pointer = this

        if (this.props.app_states.chosen_phone_case.indexOf("base64") > 0) {
            let obj_base64 = this.props.app_states.chosen_phone_case.split('base64,')[1]
            obj_text = atob(obj_base64)
            handle_data_pointer(obj_text, obj_parse_pointer, this_pointer, 'model.obj')
        }
        else {
            //let path = this.props.app_states.assets_path + this.props.app_states.chosen_phone_case + ".obj"
            let url = 'http://localhost:3000/assets/' + this.props.app_states.chosen_phone_case + ".obj"
            fetch(url)
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                handle_data_pointer(data, obj_parse_pointer, this_pointer, this_pointer.props.app_states.chosen_phone_case)
            })
        }
    }
    render() {
        return (
            <div className="export-control">
                <select className="select-3d" onChange={this.props.on3DFormatSelect}>
                    <option value="">Select Format</option>
                    {this.props.export_3d_formats.map((format) => (
                        <option key={format} value={format} >.{format}</option>
                    ))}
                </select>
                {/* NEEDS a function to export 3D model bound in App.js!!!! */}
                <button ref="download" className="button-3d" onClick={() => this.clickHandler()}>Export 3D Model</button>
            </div>
        )
    }
}

export default ExportControl