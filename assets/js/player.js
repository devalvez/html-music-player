// Playlist
const playlist = [
    {
        id: 1,
        title: "Pagan Part II (demo)",
        album: "Causa",
        artist: "Vitalism",
        duration: "1:30",
        art: "https://cdns-images.dzcdn.net/images/cover/170de55d44267df1d5fcffb359b10a40/350x350.jpg",
        track: 'sounds/track-01.mp3'
    },
    {
        id: 2,
        title: "Ego Death feat. Steve Vai (demo)",
        album: "EP",
        artist: "Polyphia",
        duration: "1:30",
        art: "https://i.scdn.co/image/ab67616d0000b2731b3fac357a7fb37bc706f7e9",
        track: 'sounds/track-02.mp3'
    },
    {
        id: 3,
        title: "Until We Say Goodbye (demo)",
        album: "Engine Of Creation",
        artist: "Joe Satriani",
        duration: "1:30",
        art: "https://cdns-images.dzcdn.net/images/cover/97a6e876cdbd75264dc3b7e071c853d5/350x350.jpg",
        track: 'sounds/track-03.mp3'
    }
];

const currentList = document.querySelector('#currentList');
const coverContainer = document.querySelector('.cover-container');
const trackCover = document.querySelector('#trackCover');
const trackTitle = document.querySelector('#trackTitle');
const trackAlbum = document.querySelector('#trackAlbum');
const trackArtist = document.querySelector('#trackArtist');

// Player nativo do browser
const nativePlayer = document.querySelector('#nativePlayer');
const toggleButton = document.querySelector('#toggleButton');
const previousButton = document.querySelector('#previousButton');
const nextButton = document.querySelector('#nextButton');
const toggleIndicator = document.querySelector('#toggleIndicator');
const timeExec = document.querySelector('#timeExec');
const timeDuration = document.querySelector('#timeDuration');

const seekbar = document.querySelector('#seekbar');

let trackPlaying = null;

//Render current playlist.
playlist.map(({ id, title, duration }, index) => {
    let item = document.createElement('li');
    let content = `<a key="${index}" id="item-${id}" href="#" onclick="selectMusic('${index}')">`;
    content += '<div>';
    content += `<h5>${id < 10 ? '0' + id : id} - ${title}</h5>`;
    content += '</div>';
    content += '</a>';
    content += `<small class="duration-time">${duration}</small>`;
    item.innerHTML = content;
    currentList.append(item);
});

// Change icon Play/Pause.
const updateToggleIndicator = () => {
    if (nativePlayer.getAttribute('src') === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: 'Select any track from the playlist.'
        })
    } else {
        if (nativePlayer.paused || nativePlayer.ended) {
            toggleIndicator.setAttribute('class', 'play-icon');
            coverContainer.classList.add('animation-state-pause');
        } else {
            toggleIndicator.setAttribute('class', 'pause-icon');
            coverContainer.classList.add('spin-animation');
            coverContainer.classList.remove('animation-state-pause');
        }
    }
}

// Update player status.
const toggleStatusPlayer = () => {
    if (nativePlayer.paused || nativePlayer.ended) {
        nativePlayer.play();
    }
    else {
        nativePlayer.pause();
    }

    updateToggleIndicator(); // Change icon Play/Pause;
}

// Define music by selection.
const selectMusic = (index) => {
    trackPlaying = index;

    let card = '<div class="notification-card">';
    card += '<div class="cover-container">';
    card += `<img src="${playlist[index].art}" alt="icon" />`;
    card += '</div>';
    card += '<div class="details-container">';
    card += `<h3>${playlist[index].title}</h3>`;
    card += `<h5>${playlist[index].album}</h5>`;
    card += `<h5 class="normal">${playlist[index].artist}</h5>`;
    card += '</div>';
    card += '</div>';

    Swal.fire({
        width: 300,
        html: card,
        showClass: {
            popup: 'animate__animated animate__backInRight'
        },
        hideClass: {
            popup: 'animate__animated animate__backOutRight'
        },
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500
    });

    nativePlayer.setAttribute('src', playlist[trackPlaying].track);
    // trackCover.setAttribute('src', art);
    trackCover.setAttribute('src', playlist[trackPlaying].art ? playlist[trackPlaying].art : 'assets/images/icon.png');
    trackTitle.innerHTML = playlist[trackPlaying].id + ' - ' + playlist[trackPlaying].title;
    trackAlbum.innerHTML = playlist[trackPlaying].album;
    trackArtist.innerHTML = playlist[trackPlaying].artist;
    //
    timeDuration.innerHTML = playlist[trackPlaying].duration;
    toggleStatusPlayer(); // Update status player.
}

// Previous button action
previousButton.addEventListener('click', () => {
    if (trackPlaying > 0) {
        trackPlaying = trackPlaying - 1;

        let card = '<div class="notification-card">';
        card += '<div class="cover-container">';
        card += `<img src="${playlist[trackPlaying].art}" alt="icon" />`;
        card += '</div>';
        card += '<div class="details-container">';
        card += `<h3>${playlist[trackPlaying].title}</h3>`;
        card += `<h5>${playlist[trackPlaying].album}</h5>`;
        card += `<h5 class="normal">${playlist[trackPlaying].artist}</h5>`;
        card += '</div>';
        card += '</div>';

        Swal.fire({
            width: 300,
            html: card,
            showClass: {
                popup: 'animate__animated animate__backInRight'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutRight'
            },
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
        });

        nativePlayer.setAttribute('src', playlist[trackPlaying].track);
        // trackCover.setAttribute('src', art);
        trackCover.setAttribute('src', playlist[trackPlaying].art);
        trackTitle.innerHTML = playlist[trackPlaying].id + ' - ' + playlist[trackPlaying].title;
        trackAlbum.innerHTML = playlist[trackPlaying].album;
        trackArtist.innerHTML = playlist[trackPlaying].artist;
        //
        timeDuration.innerHTML = playlist[trackPlaying].duration;
        toggleStatusPlayer(); // Update status player.
    } else {
        trackPlaying = playlist.length - 1;

        let card = '<div class="notification-card">';
        card += '<div class="cover-container">';
        card += `<img src="${playlist[trackPlaying].art}" alt="icon" />`;
        card += '</div>';
        card += '<div class="details-container">';
        card += `<h3>${playlist[trackPlaying].title}</h3>`;
        card += `<h5>${playlist[trackPlaying].album}</h5>`;
        card += `<h5 class="normal">${playlist[trackPlaying].artist}</h5>`;
        card += '</div>';
        card += '</div>';

        Swal.fire({
            width: 300,
            html: card,
            showClass: {
                popup: 'animate__animated animate__backInRight'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutRight'
            },
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
        });

        nativePlayer.setAttribute('src', playlist[trackPlaying].track);
        // trackCover.setAttribute('src', art);
        trackCover.setAttribute('src', playlist[trackPlaying].art);
        trackTitle.innerHTML = playlist[trackPlaying].id + ' - ' + playlist[trackPlaying].title;
        trackAlbum.innerHTML = playlist[trackPlaying].album;
        trackArtist.innerHTML = playlist[trackPlaying].artist;
        //
        timeDuration.innerHTML = playlist[trackPlaying].duration;
        toggleStatusPlayer(); // Update status player.
    }
});

// Play/Pause button action
toggleButton.addEventListener('click', toggleStatusPlayer);

// Next button action
nextButton.addEventListener('click', () => {
    if (trackPlaying < playlist.length - 1) {
        trackPlaying = trackPlaying + 1;

        let card = '<div class="notification-card">';
        card += '<div class="cover-container">';
        card += `<img src="${playlist[trackPlaying].art}" alt="icon" />`;
        card += '</div>';
        card += '<div class="details-container">';
        card += `<h3>${playlist[trackPlaying].title}</h3>`;
        card += `<h5>${playlist[trackPlaying].album}</h5>`;
        card += `<h5 class="normal">${playlist[trackPlaying].artist}</h5>`;
        card += '</div>';
        card += '</div>';

        Swal.fire({
            width: 300,
            html: card,
            showClass: {
                popup: 'animate__animated animate__backInRight'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutRight'
            },
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
        });

        nativePlayer.setAttribute('src', playlist[trackPlaying].track);
        trackCover.setAttribute('src', playlist[trackPlaying].art);
        trackTitle.innerHTML = playlist[trackPlaying].id + ' - ' + playlist[trackPlaying].title;
        trackAlbum.innerHTML = playlist[trackPlaying].album;
        trackArtist.innerHTML = playlist[trackPlaying].artist;
        //
        timeDuration.innerHTML = playlist[trackPlaying].duration;
        toggleStatusPlayer(); // Update status player.
    } else {
        trackPlaying = 0;

        let card = '<div class="notification-card">';
        card += '<div class="cover-container">';
        card += `<img src="${playlist[trackPlaying].art}" alt="icon" />`;
        card += '</div>';
        card += '<div class="details-container">';
        card += `<h3>${playlist[trackPlaying].title}</h3>`;
        card += `<h5>${playlist[trackPlaying].album}</h5>`;
        card += `<h5 class="normal">${playlist[trackPlaying].artist}</h5>`;
        card += '</div>';
        card += '</div>';

        Swal.fire({
            width: 300,
            html: card,
            showClass: {
                popup: 'animate__animated animate__backInRight'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutRight'
            },
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
        });

        nativePlayer.setAttribute('src', playlist[trackPlaying].track);
        // trackCover.setAttribute('src', art);
        trackCover.setAttribute('src', playlist[trackPlaying].art);
        trackTitle.innerHTML = playlist[trackPlaying].id + ' - ' + playlist[trackPlaying].title;
        trackAlbum.innerHTML = playlist[trackPlaying].album;
        trackArtist.innerHTML = playlist[trackPlaying].artist;
        //
        timeDuration.innerHTML = playlist[trackPlaying].duration;
        toggleStatusPlayer(); // Update status player.
    }
});

const resetTracks = () => {
    trackPlaying = 0;
    duration = '0:00';
    coverContainer.classList.remove('spin-animation');
    document.querySelector('#seekbar div.seekbar').style.flexBasis = '0%';
    
    toggleIndicator.setAttribute('class', 'play-icon');
}

nativePlayer.addEventListener('ended', () => {
    if (trackPlaying + 1 < playlist.length) {
        trackPlaying = parseInt(trackPlaying) + 1;

        console.log(trackPlaying);

        let card = '<div class="notification-card">';
        card += '<div class="cover-container">';
        card += `<img src="${playlist[trackPlaying].art}" alt="icon" />`;
        card += '</div>';
        card += '<div class="details-container">';
        card += `<h3>${playlist[trackPlaying].title}</h3>`;
        card += `<h5>${playlist[trackPlaying].album}</h5>`;
        card += `<h5 class="normal">${playlist[trackPlaying].artist}</h5>`;
        card += '</div>';
        card += '</div>';

        Swal.fire({
            width: 300,
            html: card,
            showClass: {
                popup: 'animate__animated animate__backInRight'
            },
            hideClass: {
                popup: 'animate__animated animate__backOutRight'
            },
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
        });

        nativePlayer.setAttribute('src', playlist[trackPlaying].track);
        // trackCover.setAttribute('src', art);
        trackCover.setAttribute('src', playlist[trackPlaying].art);
        trackTitle.innerHTML = playlist[trackPlaying].id + ' - ' + playlist[trackPlaying].title;
        trackAlbum.innerHTML = playlist[trackPlaying].album;
        trackArtist.innerHTML = playlist[trackPlaying].artist;
        //
        timeDuration.innerHTML = playlist[trackPlaying].duration;
        toggleStatusPlayer(); // Update status player.
    } else {
        resetTracks();
    }
});

const updateTime = () => {
    let minute =  Math.floor(nativePlayer.currentTime / 60);
    let second = Math.floor(nativePlayer.currentTime % 60) < 10 ? '0' + Math.floor(nativePlayer.currentTime % 60) : Math.floor(nativePlayer.currentTime % 60);
    let liveTime = minute + ':' + second;
    timeExec.innerHTML = liveTime;
}


const updateSeekbar = () => {
    const progress = (nativePlayer.currentTime / nativePlayer.duration) * 100;
    document.querySelector('#seekbar div.seekbar').style.flexBasis = `${progress}%`;
}

function selectPoint(event) {
    const scrubTime = (event.offsetX / seekbar.offsetWidth) * nativePlayer.duration;
    nativePlayer.currentTime = scrubTime;
}

nativePlayer.addEventListener('timeupdate', () => {
    updateSeekbar();
    updateTime();
});

seekbar.addEventListener('click', (event) => {
    selectPoint(event);
});