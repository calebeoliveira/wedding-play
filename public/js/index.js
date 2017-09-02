(() => {
    const songRows = document.querySelectorAll('[data-song-id]');

    let currentPlaying = null;
    let fadeInInterval = null;
    let fadeOutInterval = null;

    const fadeOut = id => {
        const lastPlayingButton = document.querySelector(`[data-song-id="${currentPlaying}"] [data-play]`);
        const audio = document.querySelector(`[data-audio-id="${currentPlaying}"]`);

        lastPlayingButton.innerText = 'Play';

        if (fadeOutInterval) {
            clearInterval(fadeOutInterval);
        }

        fadeOutInterval = setInterval(() => {
            const vol = audio.volume.toFixed(1);

            if (vol === '0.0') {
                clearInterval(fadeOutInterval);
                audio.pause();
                audio.classList.remove('visible');
                currentPlaying = null;
            } else {
                audio.volume = parseFloat(vol) - 0.1;
            }
        }, 200);
    };

    const fadeIn = (id, playButton, audio) => {
        playButton.innerText = 'Pause';
        audio.classList.add('visible');

        if (fadeInInterval) {
            clearInterval(fadeInInterval);
        }

        fadeInInterval = setInterval(() => {
            if (currentPlaying === null) {
                clearInterval(fadeInInterval);

                audio.volume = 0;
                audio.play();
                currentPlaying = id;

                fadeInInterval = setInterval(() => {
                    const vol = audio.volume.toFixed(1);

                    if (vol === '1.0') {
                        clearInterval(fadeInInterval);
                    } else {
                        audio.volume = parseFloat(vol) + 0.1;
                    }
                }, 200);
            }
        }, 50);
    };

    const playClick = (id, playButton, checkbox, audio) => {
        return event => {
            event.preventDefault();
            const lastPlaying = currentPlaying;

            if (currentPlaying !== null) {
                fadeOut(currentPlaying);
            }

            if (lastPlaying !== id) {
                fadeIn(id, playButton, audio);
            }

            checkbox.checked = true;
            checkbox.onclick(new Event('click'));
        };
    };

    const checkboxClick = (row, checkbox) => {
        return event => {
            if (checkbox.checked) {
                row.classList.add('done');
            } else {
                row.classList.remove('done');
            }
        };
    };

    let id, playButton, checkbox, audio;

    for (let i in songRows) {
        if (!songRows.hasOwnProperty(i)) {
            continue;
        }

        id = parseInt(songRows[i].getAttribute('data-song-id'));
        playButton = songRows[i].querySelector('[data-play]');
        checkbox = songRows[i].querySelector('[data-done-check]');
        audio = document.querySelector(`[data-audio-id="${id}"]`);

        playButton.onclick = playClick(id, playButton, checkbox, audio);
        checkbox.onclick = checkboxClick(songRows[i], checkbox);
    }
})();