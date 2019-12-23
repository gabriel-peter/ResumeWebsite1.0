import * as $ from 'jquery';

function piChartRankings(ranks) {
    let keys = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    var values =[]
    keys.forEach(e => {
        var count = 0;
        ranks.forEach(element => {
            if(e === (Math.trunc((element-0.5)/10))*10) {
                count ++;
            }
        })
        values.push(count)
    })
    // Radial Chart 
    var formattedResult = [];
    for (var i = 0; i <= values.length -1; i++) {
        if(values[i] !== 0) {
            formattedResult.push({'angle': values[i], 'label': 10*i, 'radius': i/2+5 })
        }
    }
    // Bar Series
    // var formattedResult = [];
    // for (var i = 0; i <= values.length -1; i++) {
    //     if(values[i] !== 0) {
    //         formattedResult.push({'x': i, 'y': values[i],})
    //     }
    // }
    return formattedResult;

}
function analyseTermData(data) {
    const test_array = ["pop", "rap", "ssdsdsd"];
    const items = data.items;
    let top_artists = items.reduce((accumulator, currentValue) => accumulator.concat(currentValue.name), []);
    let top_artists_popularity = items.reduce((accumulator, currentValue) => accumulator.concat({'artist': currentValue.name, 'rank': currentValue.popularity}), []);
    let popularity_list = items.reduce((accumulator, currentValue) => accumulator.concat(currentValue.popularity), []);
    let average_artist_rank = items.reduce((accumulator, currentValue) => accumulator + currentValue.popularity, 0)/50;
    let genre_quantity = items.reduce((accumulator, currentValue) => accumulator.concat([currentValue.genres]), []).flat(); 
    const genre_intersection = test_array.filter(element => genre_quantity.includes(element));
    const radialRankings = piChartRankings(popularity_list)
    // if(term === 'short_term'){
    //     this.setState({ short_term: {top_artists,
    //          top_artists_popularity, 
    //          average_artist_rank, genre_quantity, genre_intersection,}});
    // } else if(term === 'medium_term'){
    //     this.setState({ medium_term: {top_artists, 
    //         top_artists_popularity,
    //          average_artist_rank, genre_quantity, genre_intersection,}});
    // } else {
    
    const long_term_data = { 
        top_artists,
        top_artists_popularity,
        popularity_list, 
        average_artist_rank, 
        genre_quantity, 
        genre_intersection,
        radialRankings 
    };

    return long_term_data;
    // }        
}
function getTopArtists(token) {
    // ['short_term', 'medium_term', 'long_term'].map(e => {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0',
            type: "GET",
            beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
            return(analyseTermData(data));
            }
        });
    // });
}

export default { getTopArtists };
