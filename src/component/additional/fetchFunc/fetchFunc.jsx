import PropTypes from 'prop-types';

    const fetchRes = (search, page, perPage) => {
    
    const BASE_URL = "https://pixabay.com/api/";

    return (fetch(
        `${BASE_URL}?q=${search}&page=${page}&key=27564441-2bad7552450aa73f501c58b21&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then((res) => {
        if (res.ok) {
        return res.json();
        }

        return Promise.rejected(new Error("not found"));
    }))
}

export default fetchRes;

fetchRes.propTypes = {
    search: PropTypes.string,
    page: PropTypes.number,
}