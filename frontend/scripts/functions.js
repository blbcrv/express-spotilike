function getArtist(){
    fetch('/api/artists')
        .then(response => response.json())
        .then(artists => {

            const artistsContainer = document.querySelector('.card-deck');

            artists.results.slice(0,3).forEach(artist => {

                const artistCard = document.createElement('div');
                artistCard.classList.add('card', 'mb-4');
                artistCard.innerHTML = `
                    
                        <img src="../images/${artist.avatar}" class="card-img-top" alt="${artist.name}">
                        <div class="card-body">
                            <h5 class="card-title">${artist.name}</h5>
                            <p class="card-text">${artist.biography}</p>
                        </div>
                    
                `;
                artistsContainer.appendChild(artistCard);
            })


        })
        .catch(error => console.error('Erreur lors de la récupération des artistes:', error));
}

function getAlbums(){
    fetch('/api/albums')
        .then(response => response.json())
        .then(albums => {

            let albumsContainer = document.getElementById('recom-albums');

            albums.result.slice(0,3).forEach(album => {
                const albumCard = document.createElement('div');
                albumCard.classList.add('card');

                const albumCover = document.createElement('img');
                albumCover.classList.add('card-img-top');
                albumCover.src = `../images/${album.image}`;
                albumCard.appendChild(albumCover);

                const albumName = document.createElement('h5');
                albumName.classList.add('card-title');
                albumName.textContent = album.title;
                albumCard.appendChild(albumName);

                const albumReleaseDate = document.createElement('p');
                const DateDB = album.release_date;
                const formDate = new Date(DateDB);
                const jour = formDate.getDate();
                const mois = formDate.getMonth() + 1;
                const annee = formDate.getFullYear();
                const dateFormatee = `${(jour < 10 ? '0' : '')}${jour}/${(mois < 10 ? '0' : '')}${mois}/${annee}`;

                albumReleaseDate.classList.add('card-text');
                albumReleaseDate.textContent = `Date de sortie: ${dateFormatee}`;
                albumCard.appendChild(albumReleaseDate);

                albumsContainer.appendChild(albumCard);
            })
        });
}

document.getElementById('button-connection').addEventListener("click", () =>{
    window.location.href = "../html/connexion.html";
})