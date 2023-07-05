import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_TgDTCu4ulvB0BiLgvDRV211KE78vxALDr0WMoLWTgl9YTtf7o6yjJSg8OaGbHwxX";

export function fetchBreeds(baseUrl) {
    return axios.get(baseUrl)
        .then(res => {
        return res.data;
    })
}

// export function fetchCatByBreed(breedId) {
//     return axios.get(breedId)
//         .then(res => {
//             return res.data;
//         })
// }
