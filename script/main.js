const errorDiv = document.getElementById('error');
const token =  `6205c51f2f31438ab76389b3644da184`;

const getLeagues = () => new Promise ((resolve, reject) => {
    let url = `http://api.football-data.org/v2/competitions`;
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let object = JSON.parse(xhttp.responseText);
            resolve(object);
        }
        if (xhttp.readyState == 4 && xhttp.status !== 200){
        reject('error loading');
        }
    }
    xhttp.open ('GET', url, true);
    xhttp.setRequestHeader('X-Auth-Token',token);
    xhttp.send();
});
    const arrayThroughInTheLeague = () => {
        let options = ``;
        leagues.competitions.forEach(league => {
            if (league.code) {
                options += `
                <option value="${league.code}">${league.name}</option>
                `;
    }
    const leagueInSelect = document.getElementById('league');
    leagueInSelect.innerHTML = options;
});

const error = err => errorDiv.innerHTML = err;

const worldLeagueInTheInput = () => {
    getLeagues()
    .then (arrayThroughInTheLeague)
    .catch (error)
}