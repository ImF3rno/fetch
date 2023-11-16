document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=document.querySelector('.form-control').value;
    const apiUrl=`https://www.omdbapi.com/?t=${searchTerm}&apikey=18c1a865`;
    fetch(apiUrl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.Title){
                showMovie(data);
            }else{
                showError(data);
            }
        })
});

function showMovie(data){
    document.querySelector('tbody').innerHTML=`
        <tr>
            <td>${data.Title}</td>
            <td>${data.Runtime}</td>
            <td>${data.Director}</td>
            <td>${data.Year}</td>
            <td>${data.Title}</td>
            <td>${data.Plot}</td>
            <td><img src="${data.Poster}"></td>
        </tr>
    `;
    document.querySelector('.alert').style.display='none';
}

function showError(data) {
    document.querySelector('table').style.display='none';
    const errorMessageElement=document.querySelector('.error-message');
    errorMessageElement.textContent=data.Error;
    document.querySelector('.alert').style.display='block';
}

const datalist=document.getElementById('places');
const input=document.querySelector('.places input');
fetch('https://api.meteo.lt/v1/places')
    .then(response=>response.json())
    .then(data=>{
        const locationsData=data.map(place=>place.name);
        locationsData.forEach(name=>{
            const option=document.createElement('option');
            option.value=name;
            datalist.appendChild(option);
    });
});