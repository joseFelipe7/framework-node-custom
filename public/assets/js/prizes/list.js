
document.addEventListener('DOMContentLoaded', async function() {
    console.log('document is ready. I can sleep now');
    await listPrizes()
 })
 
 async function listPrizes(page = 1){
    let perPage = 5 
    let searchPrize = document.getElementById('search-prize')
    let request = await fetch(`http://localhost:3000/api/manager/prizes?per_page=${perPage}&page=${page}&filter=${searchPrize.value}`,{
       method:"GET",
       headers:{
             "Content-Type":'application/json'
       }
    })
    let dataJson = await request.json()
    if(!request.ok){
       return alert(dataJson.message)
    }
    
    let pageData = dataJson.meta.page
    
    let indexStart = pageData.current_page-2>=1?pageData.current_page-2:1
    let indexEnd = indexStart+4<=pageData.last_page?indexStart+4:pageData.last_page
 
    let pagination = ''
    for(let i = indexStart; i<= indexEnd;i++){
       pagination+=`<li class="page-item" onClick="listPrizes(${i})"><a class="btn btn-pagination ${i==pageData.current_page?'active':''}" href="#">${i}</a></li>`
    }
    document.getElementById('pagination-container').innerHTML = `${pagination}`
 
    let td = ''
    if(dataJson.data.length == 0){
       td =`<tr class="text-center"> <td colspan="5" class="table-user text-center">Sem dados</td></tr>`
    }
    dataJson.data.forEach(item => {
       td += `
             <tr>
                <td class="table-user">
                   ${item.id}
                </td>
                <td class="text-center">${item.title}</td>
                <td class="text-center">${item.prize}</td>
                <td class="text-center">${item.date}</td>
                <td class="text-center">${item.id_winner?'Encerrado':'Aberto'}</td>
                <td class="text-center">${item.total_participants}</td>
                <td class="text-center">${item.id_winner?item.nameUser:item.total_participants<=1?'Sem participantes suficientes':'<a href="/manager/sorteios/draw-winner?id='+item.id+'"> <button class="btn btn-default-custom">Sortear vencedor</button></a>'}</td>
                <td class="table-action">
                   <a href="sorteios/editar?id=${item.id}" class="action-icon"> <i class="fa-sharp fa-solid fa-pen-to-square icon-edit"></i></a>
                   <a href="sorteios/delete?id=${item.id}" class="action-icon"> <i class="fa-sharp fa-solid fa-trash icon-del"></i></a>
                </td>
             </tr>
       `
    });
 
    document.getElementById('tbody-prize').innerHTML = `${td}`
 }
 document.getElementById('search-prize').addEventListener('keyup', ()=>{listPrizes(1)})