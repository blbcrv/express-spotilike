document.addEventListener("DOMContentLoaded", getArtist);

function getArtist(){
    fetch('/api/artists')
        .then(response => response.json())
        .then(artists => {

            const artistContainer = document.getElementById('all-cards');


            artists.results.forEach(artist => {

                // Créer une carte d'artiste
                const artistCard = document.createElement('div');
                artistCard.classList.add('card','col-md-4', 'mb-4');
                artistCard.innerHTML = `
                        <img src="../images/${artist.avatar}" class="card-img-top" alt="${artist.name}">
                        <div class="card-body">
                            <h5 class="card-title">${artist.name}</h5>
                            <p class="card-text">${artist.biography}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success" onclick="onShowClick(this, ${artist.id})">Voir plus</button>
                        </div>
                `;

                // Ajouter la carte à la conteneur des artistes
                //const currentRow = artistContainer.lastElementChild;
                artistContainer.appendChild(artistCard);
            });
        });
}

function onShowClick(button, artistId){
    fetch(`/api/artists/${artistId}`)
        .then(response => response.json())
        .then(async artist => {

            const overlay = document.createElement('div');
            overlay.classList.add('overlay', 'active');

            const artistOverlayCard = document.createElement('div');
            artistOverlayCard.classList.add('card-overlay');
            artistOverlayCard.innerHTML = `
                <img src="../images/${artist.results[0].avatar}" class="card-img-top" alt="${artist.results[0].name}">
                <div class="card-body">
                    <h5 class="card-title">${artist.results[0].name}</h5>
                    <p class="card-text">${artist.results[0].biography}</p>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Titre</th>
                                <th scope="col">Date de sortie</th>
                            </tr>
                        </thead>
                        <tbody id="albumList"></tbody>
                    </table>
                </div>
            `;

            await fetch(`/api/artists/${artistId}/albums`)
                .then(response => response.json())
                .then(albums =>  {
                    //console.log(albums.results);
                    const albumList = artistOverlayCard.querySelector('#albumList');
                    albums.results.forEach(album => {
                        const DateDB = album.release_date;
                        const formDate = new Date(DateDB);
                        const jour = formDate.getDate();
                        const mois = formDate.getMonth() + 1;
                        const annee = formDate.getFullYear();
                        const dateFormatee = `${(jour < 10 ? '0' : '')}${jour}/${(mois < 10 ? '0' : '')}${mois}/${annee}`;
                        const row = document.createElement('tr');

                        row.innerHTML = `
                            <td>${album.title}</td>
                            <td>${dateFormatee}</td>
                        `;
                        albumList.appendChild(row);
                    });
                });




            overlay.appendChild(artistOverlayCard);
            document.body.appendChild(overlay);

            // Ajouter la classe 'blurred' à la balise body
            document.body.classList.add('blurred');

            // Gérer le clic sur la surimpression pour la fermer
            overlay.addEventListener('click', () => {
                // Retirer la surimpression
                overlay.classList.add('hide');
                document.body.removeChild(overlay);

                // Retirer la classe 'blurred' de la balise body
                document.body.classList.remove('blurred');
            });
        });

}