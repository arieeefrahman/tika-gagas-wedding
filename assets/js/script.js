
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Menampilkan nama tamu
window.onload = function() {
    const tamu = getQueryParam('to');
    namaSambutan = document.getElementById('nama-sambutan')
    if (tamu) {
        // Decode URI untuk menangani emoji dan karakter khusus
        const decodedTamu = decodeURIComponent(tamu);
        namaSambutan.innerHTML = `${decodedTamu ? decodedTamu : ''}`.trim();
    } else {
        namaSambutan.innerText = "Bapak/Ibu/Saudara/i";
    }
}


// ////////////////////////

// music
var tempMusic = ''
music = document.querySelector('.music')

if (tempMusic) {
    music.src = tempMusic
}

function mulai() {
    // back to top
    window.scrollTo(0, 0)

    // sound door
    var soundDoor = document.querySelector('.sound-door')
    soundDoor.play()

    // door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')

    doors.forEach(function (door, index) {
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' + (direction * 70) + 'deg)'
    })

    // set timeout
    setTimeout(function () {
        // music play
        music.play()
        doorSection.css('transform', 'scale(6)')
    }, 600)

    // set timeout door section
    setTimeout(function () {
        doorSection.css('opacity', 0)
        $('body').removeClass('overflow-hidden')
        $('body').addClass('transition')
        doorSection.css('display', 'none')
    }, 2000)
}

var isPlaying = true

function toggleMusic(event) {
    event.preventDefault()

    const musicButton = document.getElementById('music-button')
    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }

    isPlaying = !isPlaying
}

var countdownDate = new Date("Dec 28, 2024 08:00:00").getTime();

var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = countdownDate - now;

    var days = Math.floor(distance/(1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60 )) / 1000)
    document.getElementById('countdown-wedding').innerHTML = `
        <div class="col-lg-8 col-12 d-flex justify-content-center gap-5">
            <div class="text-center p-2 rounded text-light">
                <h5>${days}</h5> Hari
            </div>
            <div class="text-center p-2 rounded text-light">
                <h5>${hours}</h5> Jam
            </div>
            <div class="text-center p-2 rounded text-light">
                <h5>${minutes}</h5> Menit
            </div>
            <div class="text-center p-2 rounded text-light">
                <h5>${seconds}</h5> Detik
            </div>
        </div>
    `

    if (distance < 0) {
        clearInterval(x)
        document.getElementById('countdown-wedding').innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Sudah dimulai!</h2></span>"
    }
}, 1000);

// const urlParams= new URLSearchParams(window.location.search);
// const panggilan = urlParams.get('p')
// const nama = urlParams.get('n')
// const namaTamuUndangan = urlParams.get('to')
// const namaSambutan = document.querySelector('#nama-sambutan')

// // Check if both panggilan and nama are null or empty
// if (!panggilan && !nama) {
//     namaSambutan.innerText = "Bapak/Ibu/Saudara/i";
// } else {
//     // Otherwise, set the text to panggilan and nama
//     namaSambutan.innerText = `${panggilan ? panggilan : ''} ${nama ? nama : ''}`.trim();
// }


// copy text

// function copyText(el) {
//     var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

//     var temp = document.createElement("textarea")

//     document.body.appendChild(temp)

//     temp.value = content.replace(/\s+/g, '')
//     temp.select() 

//     document.execCommand("copy")

//     document.body.removeChild(temp)

//     jQuery(el).text('Berhasil disalin!')

//     setTimeout(function () {
//         jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> Copy`)
//     })
// }

function copyText(el) {
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

    var temp = document.createElement("textarea")

    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, '')
    temp.select() 


    navigator.clipboard.writeText(content).then(() => {
        jQuery(el).text('Berhasil disalin!')

        setTimeout(() => {
            el.innerHTML = `<i class="fas fa-regular fa-copy"></i> Copy`;
        }, 2000);
    })
}

function handleSubmit(event) {
    event.preventDefault();

    const formData = {
        nama: document.getElementById('nama').value,
        ucapan: document.getElementById('ucapan').value,
        kehadiran: document.getElementById('kehadiran').value,
        timestamp: new Date().toISOString(),
        tamu: decodeURIComponent(getQueryParam('to') || '')
    };

    // Display a loading SweetAlert
    Swal.fire({
        title: 'Mengirim...',
        text: 'Silakan tunggu sementara kami memproses konfirmasi Anda.',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    const fetchUrl = process.env.NEXT_PUBLIC_FETCH_URL;
    fetch(fetchUrl, {
        method: 'POST',
        mode: 'no-cors', // No CORS to avoid browser restrictions
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Terima kasih!',
            text: 'Konfirmasi Anda telah diterima.',
            confirmButtonText: 'OK'
        });
        event.target.reset(); // Reset the form
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
            confirmButtonText: 'Coba Lagi'
        });
        console.error('Error:', error);
    });

    console.log('Data RSVP:', formData);
}


// function handleSubmit(event) {
//     event.preventDefault();
    
//     const formData = {
//         nama: document.getElementById('nama').value,
//         ucapan: document.getElementById('ucapan').value,
//         kehadiran: document.getElementById('kehadiran').value,
//         timestamp: new Date().toISOString(),
//         tamu: decodeURIComponent(getQueryParam('to') || '')
//     };

//     // Di sini Anda bisa menambahkan kode untuk mengirim data ke server
//     // atau menyimpan ke spreadsheet menggunakan Google Apps Script

//     fetch('https://script.google.com/macros/s/AKfycbzhgRwAb5OA4R4tGQn5H2eDpsrUs3_xLs0w87Xx4f-sQjwNSKSfPhIofn13lKNuImeK7A/exec', {
//         method: 'POST',
//         mode: 'no-cors', // Tambahkan ini
//         cache: 'no-cache',
//         credentials: 'omit',
//         body: JSON.stringify(formData),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => {
//             alert('Terima kasih atas konfirmasi Anda!');
//             event.target.reset();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
//         event.target.reset();
//     });

//     console.log('Data RSVP:', formData);
// }

// Copy Text Function
// function copyText(el) {
//     try {
//         // Find the card number element 
//         const cardContainer = el.closest('.card-container');
//         const cardNumberEl = cardContainer.querySelector('.card-number');
        
//         if (!cardNumberEl) return;

//         // Get the text content and remove extra whitespace
//         const content = cardNumberEl.textContent.trim().replace(/\s+/g, '');
        
//         // Use modern clipboard API
//         navigator.clipboard.writeText(content).then(() => {
//             el.textContent = 'Berhasil disalin!';
            
//             // Revert back to original text after 2 seconds
//             setTimeout(() => {
//                 el.innerHTML = `<i class="fas fa-regular fa-copy"></i> Copy`;
//             }, 2000);
//         }).catch(err => {
//             console.error('Failed to copy text: ', err);
//         });
//     } catch (error) {
//         console.error('Error in copyText function: ', error);
//     }
// }