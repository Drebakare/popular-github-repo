
const client_id = "6ce542c1493ca6eeea68"
const client_secret = "5c143770e3282f229fa0d8e48eb511002d6f411c";
const params = `?client_id=${client_id}&client_secret=${client_secret}`
function getErrorMsg(message,username){
    if (message === 'Not Found') {
        return `${username} doesnt Exist`
    }
    return message
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then(res => res.json())
    .then(repos => {
        return repos
    })
}

function calculateScore(followers,repos){
    return (
        (followers *3) + getStarCount(repos)
    )
}

function getStarCount(repos){
    let count = 0
    repos.forEach(repo => {
        count += repo.stargazers_count
    })
    return count
}
function getUserData(player){
    return Promise.all(
        [   getProfile(player)
             ,getRepos(player)
        ]
    ).then(([profile,repos]) => {
        console.log(calculateScore(profile.followers, repos));
        return ({
          profile,
          score: calculateScore(profile.followers, repos),
        });
    })
}

function getProfile(username){
    return fetch(`https://api.github.com/users/${username}${params}`)
      .then(res => res.json())
      .then((profile) => {
        return profile;
      })
}

function sortPlayers(players){
    return players.sort((a,b) => (a.score - b.score))
}


export function battle(players) {
    return (
        Promise.all([getUserData(players[0]), getUserData(players[1])])
        .then(results =>sortPlayers(results))  
    )
}


export function fetchPopularRepos(language) {
    const endPoint =  window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return fetch(endPoint)
            .then((res) => res.json())
            .then((data) => {
                if (!data.items) {
                    throw new Error (data.message)
                }
                return data.items
            })
}