const fetchTotal = (query) => {
       return fetch(
      `https://pixabay.com/api/?q=${query}&key=27564441-2bad7552450aa73f501c58b21&image_type=photo&orientation=horizontal`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      
}

export default fetchTotal;