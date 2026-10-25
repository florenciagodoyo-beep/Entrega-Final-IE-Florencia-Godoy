// ========== NAVEGACIÓN ENTRE SECCIONES ==========

const tabs = document.querySelectorAll('.menu button[data-panel]');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = 'panel-' + tab.dataset.panel;

        panels.forEach(panel => {
            panel.classList.toggle('activo', panel.id === target);
        });

        tabs.forEach(button => {
            const selected = button === tab;

            button.classList.toggle('activo', selected);
            button.setAttribute('aria-selected', String(selected));
        });
    });
});


// ========== REPRODUCTOR DE MÚSICA ==========

const musicAudio = document.getElementById('musica');
const musicButton = document.getElementById('btn-musica');
const musicIcon = document.getElementById('icono-musica');
const volumeSlider = document.getElementById('volumen-musica');

// Volumen inicial
musicAudio.volume = Number(volumeSlider.value) / 100;

// Actualizar imagen del botón
function updatePlayIcon() {
    const playing = !musicAudio.paused;

    // Los nombres de los archivos están invertidos:
    // pause.png muestra el triángulo
    // play.png muestra las dos barras

    musicIcon.src = playing
        ? 'Assets/play.png'
        : 'Assets/Pause.png';

    musicButton.setAttribute('aria-pressed', String(playing));

    musicButton.setAttribute(
        'aria-label',
        playing ? 'Pausar música' : 'Reproducir música'
    );

    musicButton.title = playing ? 'Pausar' : 'Reproducir';
}

// Reproducir y pausar
musicButton.addEventListener('click', async () => {
    if (musicAudio.paused) {
        try {
            await musicAudio.play();
        } catch {
            musicButton.title =
                'No se pudo abrir el MP3. Revisa su nombre y ubicación.';
        }
    } else {
        musicAudio.pause();
    }
});

// Actualizar botón según el estado de la música
musicAudio.addEventListener('play', updatePlayIcon);
musicAudio.addEventListener('pause', updatePlayIcon);

// Control de volumen
volumeSlider.addEventListener('input', () => {
    musicAudio.volume = Number(volumeSlider.value) / 100;
    musicAudio.muted = false;
});

// Estado inicial
updatePlayIcon();