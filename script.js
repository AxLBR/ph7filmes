var thumbnails = []

function getData(item, index){
    let thumbnail = `https://vumbnail.com/${item.videoId}_large.jpg`;
    thumbnails.push(thumbnail);

    createItens(item, index);
}

function createItens (item, index){
    //Clona o modelo de itens e preenche com os dados
    let videoItem = document.querySelector('.videoItem').cloneNode(true);
    let videoMain = document.querySelector('.videoMain').cloneNode(true);

    videoItem.setAttribute('data-key', index);
    videoItem.querySelector('.videoItem div img').src = thumbnails[index];
    videoItem.querySelector('.videoItem div button').setAttribute('id', index);
    videoItem.querySelector('.videoItem div button').setAttribute('href', item.url);
    videoItem.querySelector('.videoItem div button').setAttribute('onclick', 'openVideo(' + index + ')');
    videoItem.querySelector('.videoItem p').innerHTML = item.name;

    //Preenche os videos na página
    if (index == 0){
        videoMain.querySelector('.videoMain div iframe').style.display = 'block';
        videoMain.querySelector('.videoMain div iframe').src = item.url + '&autoplay=1&loop=1&autopause=0&quality=720p';
        document.querySelector('.mainVideo').append(videoMain);
        
    } else{
        document.querySelector('.secondaryVideos').append(videoItem);
    }
}

//Listagem dos vídeos
videosJson.map((item, index) => {
    getData(videosJson[index], index);
})

//Tela de loading inicial
const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'flex' : 'none';

setVisible('.preload', true);

document.addEventListener('DOMContentLoaded', () =>
  wait(1000).then(() => {
    setVisible('.preload', false);
  }));

//Botões de navegação
let downArrowButton = document.querySelector('.downArrow');
let upArrowButton = document.querySelector('.upArrow');

downArrowButton.addEventListener("click", () => {
    downArrowButton.style.display = 'none';
    upArrowButton.style.display = 'block';
});

upArrowButton.addEventListener("click", () => {
    downArrowButton.style.display = 'block';
    upArrowButton.style.display = 'none';
});

//Abre video na modal
function openVideo (key){
    let itemUrl = document.getElementById(key).getAttribute('href');
    let videoScreen = document.querySelector('.fullScreen');
    let videoIframe = document.querySelector('.fullScreen iframe');

    videoIframe.src = itemUrl + '&autoplay=1';
    videoScreen.style.display = 'block';
}

//Fecha modal
function closeModal (){
    let videoScreen = document.querySelector('.fullScreen');
    let videoIframe = document.querySelector('.fullScreen iframe');
    let iframe = document.querySelector('.videoMain div iframe');

    videoScreen.style.display = 'none';
    videoIframe.src = '';
}


