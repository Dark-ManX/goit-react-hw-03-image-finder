

const fetchRes = (search, page) => {
    const BASE_URL = "https://pixabay.com/api/";

    return (fetch(
        `${BASE_URL}?q=${search}&page=${page}&key=27564441-2bad7552450aa73f501c58b21&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((res) => {
        if (res.ok) {
        return res.json();
        }

        return Promise.rejected(new Error("not found"));
    }))
}

export default fetchRes;