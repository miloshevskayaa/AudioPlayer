
const player = document.querySelector('.player'), 
playbtn = document.querySelector('.play'), 
prevbtn = document.querySelector('.prev'), 
nextbtn = document.querySelector('.next'), 
audio = document.querySelector('.audio'),
progressContainer = document.querySelector('.progresscontainer'),
progress = document.querySelector('.progress'),
image = document.querySelector('.image'),
title = document.querySelector('.title'),
author = document.querySelector('.author'),
changeplay = document.querySelector('.changeplay'),
background = document.querySelector('#background'),
volumeIcon = document.querySelector('#volumeIcon'),
currentvolume = document.querySelector('#volume'),
showvolume = document.querySelector('#showvolume'),
slider = document.querySelector('.slider'),
fill = document.querySelector('.fill')



const songs = ['Faded', 'Burevestnik', 'Show']

const authors = ['Crypto, Constance', 'Miyagi, Andy Panda', 'Anass, Marbouh']

const links = ["https://now.morsmusic.org/load/1625520422/Crypto_Constance_-_Faded_(musmore.com).mp3", 
"https://s1.muzati.net/files/mp3/miyagi_-_burevestnik_(feat._andy_panda)_muzati.net_128.mp3", 
"https://music2019.su/uploads/files/2021-12/anass-marbouh-show_100352347.mp3"]

//песня по умолчанию
let songIndex = 0

function loadAudio(song, authorchange, link){
    title.innerHTML = song
    author.innerHTML = authorchange
    audio.src = link
    image.src = `./assets/images/${song}.jpg`
    background.src = `./assets/images/${song}.jpg`

}

loadAudio(songs[songIndex], authors[songIndex], links[songIndex])


function playAudio(){
    player.classList.add('play')
    changeplay.src = './assets/images/pause.png'
    audio.play()
}
function pauseAudio() {
    player.classList.remove('play')
    changeplay.src = './assets/images/play.png'
    audio.pause();
}
playbtn.addEventListener('click', () => {
    const playing = player.classList.contains('play')
    if(playing){
        pauseAudio()
    } else{
        playAudio()
    }
})

function nextAudio(){
    songIndex++
    if(songIndex > songs.length-1){
        songIndex = 0
    }
    loadAudio(songs[songIndex], authors[songIndex], links[songIndex])
    playAudio()
}
nextbtn.addEventListener('click', nextAudio)

function prevAudio(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length-1
    }
    loadAudio(songs[songIndex], authors[songIndex], links[songIndex])
    playAudio()
}
prevbtn.addEventListener('click', prevAudio)

function progressUpdate(e){
    //длительность песни, время песни которое прошло
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100

    progress.style.width = `${progressPercent}%`

    let musicCurrentTime = player.querySelector(".current"),
    musicDuration = player.querySelector(".duration")

    audio.addEventListener("loadeddata", () => {
        //update song total duration
        let audioDuration = audio.duration;
        let totalmin = Math.floor(audioDuration / 60)
        let totalsec = Math.floor(audioDuration % 60)
        if(totalsec < 10){ //adding 0 if sec is less than 10
            totalsec = `0${totalsec}`
        }
        musicDuration.innerText = `${totalmin}:${totalsec}`
    })
       
    //update playing song current time
    let currentmin = Math.floor(currentTime / 60)
    let currentsec = Math.floor(currentTime % 60)
    if(currentsec < 10){ //adding 0 if sec is less than 10
        currentsec = `0${currentsec}`
    }
    musicCurrentTime.innerText = `${currentmin}:${currentsec}`

}
audio.addEventListener('timeupdate', progressUpdate)



function setProgress(e){
    //узнаем ширину контейнера
    const width = this.clientWidth
    //узнаем место которое указал пользователь по координатам
    const clickCoordX = e.offsetX
    //узнаем длину трека
    const duration = audio.duration

    audio.currentTime = (clickCoordX / width) * duration

}
progressContainer.addEventListener('click', setProgress)

let lastVolume;

function muteSound(){
    volumeIcon.classList.toggle('btnNoSound')

    if ([...volumeIcon.classList].includes('btnNoSound')) {
        lastVolume = +showvolume.innerHTML
        audio.volume = 0
        showvolume.innerHTML = 0
        currentvolume.value = 0
        fill.style.width = 0
    } else {
        audio.volume = lastVolume / 100
        showvolume.innerHTML = lastVolume
        currentvolume.value = lastVolume
        fill.style.width = `${lastVolume}%`
    }

}

function changeVolume(e){
    showvolume.innerHTML = currentvolume.value
    audio.volume = currentvolume.value / 100
}

volumeIcon.addEventListener("click", muteSound)
currentvolume.addEventListener("change", changeVolume)

audio.addEventListener('ended', nextAudio)

function setbar(){
    fill.style.width = slider.value + "%";
}
slider.addEventListener('input', setbar)


