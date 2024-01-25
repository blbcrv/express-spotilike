document.addEventListener("DOMContentLoaded", getAlbums);

function getAlbums(){
    fetch('/api/albums')
        .then(response => response.json())
        .then(albums => {

            const albumContainer = document.getElementById('all-cards');

            albums.result.forEach(async album => {
                const albumCard = document.createElement('div');

                albumCard.classList.add('card', 'col-md-4', 'mb-4');

                const DateDB = album.release_date;
                const formDate = new Date(DateDB);
                const jour = formDate.getDate();
                const mois = formDate.getMonth() + 1;
                const annee = formDate.getFullYear();
                const dateFormatee = `${(jour < 10 ? '0' : '')}${jour}/${(mois < 10 ? '0' : '')}${mois}/${annee}`;

                albumCard.innerHTML = `
                    
                        <img src="../images/${album.image}" class="card-img-top" alt="${album.title}">
                        <div class="card-body">
                            <h5 class="card-title">${album.title}</h5>
                            <p class="card-text">Date de sortie : ${dateFormatee}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success" onclick="onShowClick(this, ${album.id})">Voir plus</button>
                        </div>
                    
                `;
                albumContainer.appendChild(albumCard);
            });
        });
}

function onShowClick(button, albumId){
   fetch(`/api/albums/${albumId}`)
        .then(response => response.json())
        .then(async album => {

            const overlay = document.createElement('div');
            overlay.classList.add('overlay', 'active');

            const DateDB = album[0].release_date;
            const formDate = new Date(DateDB);
            const jour = formDate.getDate();
            const mois = formDate.getMonth() + 1;
            const annee = formDate.getFullYear();
            const dateFormatee = `${(jour < 10 ? '0' : '')}${jour}/${(mois < 10 ? '0' : '')}${mois}/${annee}`;

            let artistData;

            await fetch(`/api/artists/${album[0].artist_id}`)
                .then(response => response.json())
                .then(artist =>  {
                    artistData = artist;
                });

            const albumOverlayCard = document.createElement('div');

            albumOverlayCard.classList.add('card-overlay');
            albumOverlayCard.innerHTML = `
                <img src="../images/${album[0].image}" class="card-img-top" alt="${album[0].title}">
                <div class="card-body">
                    <h5 class="card-title">${album[0].title} - ${artistData.results[0].name}</h5>
                    <p class="card-text">${dateFormatee}</p>
                    <h6>Morceaux de l'album:</h6>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Titre</th>
                                <th scope="col">Durée</th>
                            </tr>
                        </thead>
                        <tbody id="trackList"></tbody>
                    </table>
                </div>
            `;

            await fetch(`/api/albums/${album[0].id}/songs`)
                .then(response => response.json())
                .then(tracks => {
                        const trackList = albumOverlayCard.querySelector('#trackList');

                        tracks.result.forEach(track => {
                            const row = document.createElement('tr');

                            row.innerHTML = `
                            <td>${track.title}</td>
                            <td>${track.duration}</td>
                        `;
                            trackList.appendChild(row);
                        });

                })

            overlay.appendChild(albumOverlayCard);

            document.body.appendChild(overlay);
            document.body.classList.add('blurred');

            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
                document.body.classList.remove('blurred');
            });
        });

}