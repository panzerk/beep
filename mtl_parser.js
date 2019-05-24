

mtl_text = "# Blender MTL File: 'None'NEXT_LINE# Material Count: 1NEXT_LINENEXT_LINEnewmtl MaterialNEXT_LINENs 225.000000NEXT_LINEKa 1.000000 1.000000 1.000000NEXT_LINEKd 0.800000 0.777799 0.285769NEXT_LINEKs 0.500000 0.500000 0.500000NEXT_LINEKe 0.0 0.0 0.0NEXT_LINENi 1.450000NEXT_LINEd 1.000000NEXT_LINEillum 2NEXT_LINE"
mtl_text +="newmtl Material__NEXT_LINENs 225.000000NEXT_LINEKa 1.000000 1.000000 1.000000NEXT_LINEKd 0.800000 0.777799 0.285769NEXT_LINEKs 0.500000 0.500000 0.500000NEXT_LINEKe 0.0 0.0 0.0NEXT_LINENi 1.450000NEXT_LINEd 1.000000NEXT_LINEillum 2NEXT_LINE"
mtl_text = mtl_text.split('NEXT_LINE').join('\n')

obj_text = "# Blender v2.80 (sub 51) OBJ File: ''NEXT_LINE# www.blender.orgNEXT_LINEmtllib untitled.mtlNEXT_LINEo CubeNEXT_LINEv 1.000000 1.000000 -1.000000NEXT_LINEv 1.000000 -1.000000 -1.000000NEXT_LINEv 1.000000 1.000000 1.000000NEXT_LINEv 1.000000 -1.000000 1.000000NEXT_LINEv -1.000000 1.000000 -1.000000NEXT_LINEv -1.000000 -1.000000 -1.000000NEXT_LINEv -1.000000 1.000000 1.000000NEXT_LINEv -1.000000 -1.000000 1.000000NEXT_LINEvt 0.375000 0.000000NEXT_LINEvt 0.625000 0.000000NEXT_LINEvt 0.625000 0.250000NEXT_LINEvt 0.375000 0.250000NEXT_LINEvt 0.375000 0.250000NEXT_LINEvt 0.625000 0.250000NEXT_LINEvt 0.625000 0.500000NEXT_LINEvt 0.375000 0.500000NEXT_LINEvt 0.625000 0.750000NEXT_LINEvt 0.375000 0.750000NEXT_LINEvt 0.625000 0.750000NEXT_LINEvt 0.625000 1.000000NEXT_LINEvt 0.375000 1.000000NEXT_LINEvt 0.125000 0.500000NEXT_LINEvt 0.375000 0.500000NEXT_LINEvt 0.375000 0.750000NEXT_LINEvt 0.125000 0.750000NEXT_LINEvt 0.625000 0.500000NEXT_LINEvt 0.875000 0.500000NEXT_LINEvt 0.875000 0.750000NEXT_LINEvn 0.0000 1.0000 0.0000NEXT_LINEvn 0.0000 0.0000 1.0000NEXT_LINEvn -1.0000 0.0000 0.0000NEXT_LINEvn 0.0000 -1.0000 0.0000NEXT_LINEvn 1.0000 0.0000 0.0000NEXT_LINEvn 0.0000 0.0000 -1.0000NEXT_LINEusemtl MaterialNEXT_LINEs offNEXT_LINEf 1/1/1 5/2/1 7/3/1 3/4/1NEXT_LINEf 4/5/2 3/6/2 7/7/2 8/8/2NEXT_LINEf 8/8/3 7/7/3 5/9/3 6/10/3NEXT_LINEf 6/10/4 2/11/4 4/12/4 8/13/4NEXT_LINEf 2/14/5 1/15/5 3/16/5 4/17/5NEXT_LINEf 6/18/6 5/19/6 1/20/6 2/11/6NEXT_LINE"
obj_text = obj_text.split('NEXT_LINE').join('\n')

function mtl_parse(mtl_text){

    lines = mtl_text.split('\n')

    materials = {}

    i = 0
    next_name = ''
    next_color = ''
    
    while(i<lines.length){
        while(i<lines.length){
            if(lines[i]===undefined){
                break
            }
            if(lines[i].startsWith('newmtl')){
                next_name = lines[i].substring(6).trim()
                break
            }
            else{
                i++
                continue
            }
        }
        if(next_name.length!=0){
            while(i<lines.length){
                if(lines[i]===undefined){
                    break
                }
                if(lines[i].startsWith('Kd')){
                    next_color = lines[i].substring(2).trim()
                    break
                }
                else{
                    i++
                    continue
                }
            }
        }
        else{
            i++
            continue
        }
        if(next_name.length!=0 && next_color.length!=0){
            materials[next_name] = next_color+''
            next_name = ''
            next_color = ''
            i++
            continue
        }
        else{
            i++
            continue
        }
    }
    return materials
}

function obj_parse(obj_text){

    lines = obj_text.split('\n')

    result = {}
    i = 0
    mtllib_line = ''
    usemtl_line = ''

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
        if(mtllib_line!=-1){
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

console.log(mtl_parse(mtl_text))
console.log(obj_parse(obj_text))
