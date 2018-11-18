const axios = require('axios');

function getVerse(message) {
    const API_URL = 'https://api.esv.org/v3/passage/text';

    const params = {
        'q': message,
        'include-headings': false,
        'include-footnotes': false,
        'indent-poetry': false,
        'indent-poetry-lines': 1,
        'include-verse-numbers': false,
        'indent-paragraphs': 1,
        'include-short-copyright': false,
        'include-footnote-body': false,
        'include-passage-references': false,
        'include-passage-horizontal-lines': false,
        'include-heading-horizontal-lines': false,
        'horizontal-line-length': 1000,
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 70db78fe664b4a05bd20f3322143dabb3660656c',
        },
        params,
    };

    return new Promise((resolve) => {
        axios.get(API_URL, config)
            .then((res) => {
                // console.log("axios response: ", res.data)
                // console.log("axios response: ", res)
                // console.log("VERSE BABAY")
                // console.log(res.data.passages)
                resolve(res.data.passages);
            }).catch((err) => {
                // console.log("axios error: ", err.response)
                console.log('failed: ', err);
            });
    });
}

module.exports = {
    getVerse,
};
