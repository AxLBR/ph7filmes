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
$(document).ready(function() {
  const menuBtn = $('.scroll');
  menuBtn.click(() => {
    setTimeout(() => {
      let downArrowButton = document.querySelector('.downArrow');
      let upArrowButton = document.querySelector('.upArrow');

      if(downArrowButton.style.display != 'none'){
        downArrowButton.style.display = 'none';
        upArrowButton.style.display = 'block';
      } else {
        downArrowButton.style.display = 'block';
        upArrowButton.style.display = 'none';
      }

      removeHash();      
    }, 5);
  })
});

//Remove o # do link da página
function removeHash (){
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

//Da o scroll de forma suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

//Adiciona ano nos rodapés
document.querySelectorAll('.year').forEach(rodape => {
  const d = new Date();
  let year = d.getFullYear();

  rodape.innerHTML = year;
})

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

//Reseta medidas da página para o mobile
function resetHeight(){
  document.body.style.height = window.innerHeight + "px";
}

window.addEventListener("resize", resetHeight);
resetHeight();


