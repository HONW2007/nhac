document.addEventListener('DOMContentLoaded', () => {
    const disk = document.getElementById('disk');
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const randomBtn = document.getElementById('randomBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');

    // Danh sách 39 bài hát
    const songs = [
        { src: 'music/nonhaumotloi.mp3', title: 'Bài Hát 1' },
        { src: 'music/nmmm.mp3', title: 'Bài Hát 2' },
        { src: 'music/don.mp3', title: 'Bài Hát 3' },
        { src: 'music/ss.mp3', title: 'Bài Hát 4' },
        { src: 'music/s1.mp3', title: 'Bài Hát 5' },
        { src: 'music/den.mp3', title: 'Bài Hát 6' },
        { src: 'music/den1.mp3', title: 'Bài Hát 7' },
        { src: 'music/den2.mp3', title: 'Bài Hát 8' },
        { src: 'music/den4.mp3', title: 'Bài Hát 9' },
        { src: 'music/den5.mp3', title: 'Bài Hát 10' },
        { src: 'music/mua.mp3', title: 'Bài Hát 11' },
        { src: 'music/as.mp3', title: 'Bài Hát 12' },
        { src: 'music/anhcha.mp3', title: 'Bài Hát 13' },
        { src: 'music/1.mp3', title: 'Bài Hát 14' },
        { src: 'music/3.mp3', title: 'Bài Hát 15' },
        { src: 'music/4.mp3', title: 'Bài Hát 16' },
        { src: 'music/5.mp3', title: 'Bài Hát 17' },
        { src: 'music/6.mp3', title: 'Bài Hát 18' },
        { src: 'music/11.mp3', title: 'Bài Hát 19' },
        { src: 'music/12.mp3', title: 'Bài Hát 20' },
        { src: 'music/13.mp3', title: 'Bài Hát 21' },
        { src: 'music/a.mp3', title: 'Bài Hát 22' },
        { src: 'music/aa.mp3', title: 'Bài Hát 23' },
        { src: 'music/aaa.mp3', title: 'Bài Hát 24' },
        { src: 'music/aab.mp3', title: 'Bài Hát 25' },
        { src: 'music/ab.mp3', title: 'Bài Hát 26' },
        { src: 'music/ac.mp3', title: 'Bài Hát 27' },
        { src: 'music/remix1.mp3', title: 'Bài Hát 29' },
        { src: 'music/remix2.mp3', title: 'Bài Hát 30' },
        { src: 'music/remix3.mp3', title: 'Bài Hát 31' },
        { src: 'music/remix4.mp3', title: 'Bài Hát 32' },
        { src: 'music/remix5.mp3', title: 'Bài Hát 33' },
        { src: 'music/remix6.mp3', title: 'Bài Hát 34' },
        { src: 'music/remix7.mp3', title: 'Bài Hát 35' },
        { src: 'music/remix8.mp3', title: 'Bài Hát 36' },
        { src: 'music/remix9.mp3', title: 'Bài Hát 37' },
        { src: 'music/remix10.mp3', title: 'Bài Hát 38' },
        { src: 'music/abb.mp3', title: 'Bài Hát 39' }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isRepeating = false;

    // Định dạng thời gian (mm:ss)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Load bài hát
    function loadSong(index) {
        try {
            audio.src = songs[index].src;
            document.querySelector('h2').textContent = songs[index].title;
            audio.addEventListener('loadedmetadata', () => {
                progressBar.max = audio.duration || 0;
                durationEl.textContent = formatTime(audio.duration);
                progressBar.value = 0;
                currentTimeEl.textContent = '0:00';
            }, { once: true });
        } catch (err) {
            console.error(`Không tìm thấy bài hát ${index + 1}: ${songs[index].title}`);
            nextSong();
        }
    }

    // Cập nhật thanh tiến trình
    function updateProgress() {
        progressBar.value = audio.currentTime;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }

    // Phát hoặc tạm dừng
    function togglePlay() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audio.play().catch(err => {
                console.error('Lỗi phát nhạc:', err);
                isPlaying = false;
                playBtn.textContent = '▶️';
                disk.classList.remove('rotate');
            });
            disk.classList.add('rotate');
            playBtn.textContent = '⏸️';
        } else {
            audio.pause();
            disk.classList.remove('rotate');
            playBtn.textContent = '▶️';
        }
    }

    // Chuyển bài trước
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play().catch(err => console.error('Lỗi phát nhạc:', err));
        }
    }

    // Chuyển bài sau
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play().catch(err => console.error('Lỗi phát nhạc:', err));
        }
    }

    // Lặp lại
    function toggleRepeat() {
        isRepeating = !isRepeating;
        audio.loop = isRepeating;
        repeatBtn.classList.toggle('active', isRepeating);
    }

    // Phát ngẫu nhiên
    function randomSong() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentSongIndex); // Tránh chọn bài hiện tại
        currentSongIndex = newIndex;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play().catch(err => console.error('Lỗi phát nhạc:', err));
        }
    }

    // Tua nhạc
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
        updateProgress();
    });

    // Cập nhật tiến trình theo thời gian thực
    audio.addEventListener('timeupdate', updateProgress);

    // Tự động chuyển bài khi kết thúc
    audio.addEventListener('ended', () => {
        if (!isRepeating) {
            nextSong();
        }
    });

    // Sự kiện cho các nút
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    repeatBtn.addEventListener('click', toggleRepeat);
    randomBtn.addEventListener('click', randomSong);

    // Load bài hát đầu tiên
    loadSong(currentSongIndex);
});