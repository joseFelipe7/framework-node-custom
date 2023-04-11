const fs = require('fs')
const path = require('path')
async function index (res, viewPath){
    res.status = (status)=>{
        res.statusCode = status
        return res
    }
    res.json = (obj)=>{

        json(obj, res)
        return res
    }
    res.view = (viewFile, data = {})=>{
        let output = view(viewPath, viewFile, data, res)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(output);
        res.end();
        return res
    }
    res.redirect = (routePath)=>{
        redirect(routePath, res)
        res.end();
        return res
    }
    return res
}
function view(viewPath, viewFile, data, res, pagePrevious = null){
    let exists = fs.existsSync(path.join(viewPath,viewFile))
        if (exists) {
            try {
                let page = pagePrevious || fs.readFileSync(path.join(viewPath,viewFile), 'utf8')
                const matches = page.match(/{{.+?}}/g);
                let newVerify = false
                if(matches){
                    matches.forEach((item, index)=>{
                        let key = item.slice(2, -2).trim()
                        let regex = /\((.*?)\)/;
                        let match = regex.exec(key);
                        if (match) {
                            let [callback, param] = key.slice(0, -1).split('(')
                            if(callback == 'include'){
                                const indexStart = page.indexOf(matches[index]);
                                page = page.substring(0, indexStart) + view(viewPath, param, data, res) + page.substring(indexStart + matches[index].length); 
                            }
                            if(callback == 'if'){
                                page = ifOption(page,param,data,matches, index)
                            }
                            if(callback == 'each'){
                                // pego os parametros da função
                                let [alias, obj] = param.split(' in ')
                                alias = alias.trim()
                                obj = obj.trim()
                                
                                //pego a posição do inicial each
                                const indexStart = page.indexOf(matches[index]);

                                //pego a posição do encerramento each
                                let regex = /{{\s*endeach\s*\(\s*\)\s*}}/;
                                let match = page.substring(indexStart + matches[index].length).match(regex);
                                let repeatPart = ''
                                //repito o conteudo dentro do foreach e troco pelas variaveis do item
                                data[obj].forEach(item=>{
                                    let partpage = (page.substring(indexStart+matches[index].length, (indexStart+matches[index].length)+match.index))
                                    for (const key in item) {
                                        partpage = partpage.replace(new RegExp(`{{\\s*${alias}\\.${key}\\s*}}`, 'g'), item[key])
                                        partpage = partpage.replace(new RegExp(`${alias}\\.${key}`, 'g'), "'"+item[key]+"'")
                                                                  
                                    }
                                    repeatPart += partpage
                                })

                                //adicionando parte repetida
                                const indexEnd = page.indexOf(match)+match[0].length
                                page = page.substring(0, indexStart) + repeatPart + page.substring(indexEnd)
                                newVerify = true
                            }
                        } 
                    })
                }
                //troco as variaveis restantes pelo valor passado pra view
                for (const key in data) {
                    page = page.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), data[key]);
                }

                //verifico se faltou executar ou trocar algum valor dentro de {{ }}
                const matchesRemained = page.match(/{{.+?}}/g);
                if(matchesRemained && newVerify){
                    page = view(viewPath, viewFile, data, res, page)
                }
                return page
            } catch (error) {
                return 'ocorreu um erro ao tentar ler sua view';
            }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        throw new Error('view nao encontrada')
    }
}
function json(obj, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
}
function redirect(routePath, res){
    res.writeHead(301, {'Location': routePath});
}
function ifOption(page,param,data,matches, index){
    let result = false
    //casos possiveis
    //param 1   comparador   param 2
    //!param 1   comparador   !param 2
    //param 1   comparador   !param 2
    //!param 1   comparador   param 2
    // ==
    // !=
    //param 1
    //!param 1
    
    param = param.trim().split(',')
    
    if(param.length == 1){
        let [param1] = param
        let revertResult = false
        if(param1[0] == '!'){
            
            revertResult = true
            param1 = param1.slice(1)

        }
        if(Number(param1)){
            param1 = Number(param1)
        }else if((param1[0] == "'" || param1[0] == '"') && (param1[param1.length-1] == "'" || param1[param1.length-1] == '"') && (param1[0] == param1[param1.length-1])){
            param1 = param1.slice(1, -1)
        }else{
            param1 = data[param1]
        }
        if(!param1) return page

        result=(param1 && param1 != 'null')?true:false
        result = revertResult?!result:result

    }else if(param.length == 3){
        let [param1, cond, param2] = param
        param1 = param1.trim()
        cond   = cond.trim()
        param2 = param2.trim()

        //pegando valor 1
        if(Number(param1)){
            param1 = Number(param1)
        }else if((param1[0] == "'" || param1[0] == '"') && (param1[param1.length-1] == "'" || param1[param1.length-1] == '"') && (param1[0] == param1[param1.length-1])){
            param1 = param1.slice(1, -1)
        }else{
            param1 = data[param1]
        }
        //pegando valor 2
        if(Number(param2)){
            param2 = Number(param2)
        }else if((param2[0] == "'" || param2[0] == '"') && (param2[param2.length-1] == "'" || param2[param2.length-1] == '"') && (param2[0] == param2[param2.length-1])){
            param2 = param2.slice(1, -1)
        }else{
            param2 = data[param2]
        }
        if(!param1 || !param2) return page

        switch (cond) {
            case '==':
                result= param1 == param2?true:false
                break;
            case '!=':
                result= param1 != param2?true:false
                break;
            default:
                break;
        }
    }
    
    const indexStart = page.indexOf(matches[index]);
    
    let regex = /{{\s*endif\s*\(\s*\)\s*}}/;
    let match = page.substring(indexStart + matches[index].length).match(regex);
    
    let part = page.substring(indexStart+matches[index].length, (indexStart+matches[index].length)+match.index)
    
    const indexEnd = page.indexOf(match)+match[0].length

    if(result){
        page = page.substring(0, indexStart) + part + page.substring(indexEnd)
    }else{
        page = page.substring(0, indexStart) + page.substring(indexEnd)
    }
    return page

}
module.exports = index