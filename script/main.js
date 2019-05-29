const errorDiv = document.getElementById('error');
const token =  `6205c51f2f31438ab76389b3644da184`

const getTeams = () => new Promise ((resolve, reject) => {
    let url = `http://api.football-data.org/v2/competitions/PD/teams`;
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let object = JSON.parse(xhttp.responseText);
            console.log(object);
            resolve(object);
        }
        reject(errorDiv);
    }
    xhttp.open ('GET', url, true);
    xhttp.setRequestHeader('X-Auth-Token',token);
    xhttp.send();
});