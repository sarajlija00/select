const errorDiv = document.getElementById('error');
const token =  `6205c51f2f31438ab76389b3644da184`

const getTeams = (leagueCode) => new Promise ((resolve, reject) => {
    let url = `http://api.football-data.org/v2/competitions/${leagueCode}/teams`;
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let object = JSON.parse(xhttp.responseText);
            resolve(object);
        }
        if (xhttp.readyState == 4 && xhttp.status != 200) {
            reject('error loading teams');

        }
    }
    xhttp.open ('GET', url, true);
    xhttp.setRequestHeader('X-Auth-Token',token);
    xhttp.send();
});

const getLeagues = () => new Promise ((resolve, reject) => {
    let url = `http://api.football-data.org/v2/competitions/`;
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let object = JSON.parse(xhttp.responseText);
            resolve(object);
        }
        if (xhttp.readyState == 4 && xhttp.status != 200) {

            reject('error loading');
        }
    }
    xhttp.open ('GET', url, true);
    xhttp.setRequestHeader('X-Auth-Token',token);
    xhttp.send();
});

const populateLeagues = () => {
    let options = ``;
    getLeagues()
      .then(leagues => {
        leagues.competitions.forEach(league => {
            if(league.code) {
                options += `
                    <option value="${league.code}">${league.name}</option>
                `;
            }
        });
        const leaguesSelect = document.getElementById('leagues');
        leaguesSelect.innerHTML = options;
      })
      .catch(err => console.log('error', err));

}


const getLeague = () => {
    //procitaj value iz league select i pozovi funkciju getTeams
    // value iz league selecta predstavlja code lige
    const leaguesSelect = document.getElementById('leagues');
    let leagueCode = leaguesSelect.options[leaguesSelect.selectedIndex].value;

    let options = '';
    getTeams(leagueCode)
      .then(result => {
            result.teams.forEach(team => {
                options += `
                    <option value="${team.id}">${team.name}</option>
                `;
            });
        //   populate teams select
        const teamsSelect = document.getElementById('teams');
        teamsSelect.innerHTML = options;
      })
      .catch(err => console.log('show error', err))
}