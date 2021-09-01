const fetchData = (endpoint, request) => {
  return fetch(`https://api.github.com${endpoint}`, request)
    .then((response) => response.json())
    .then((data) => data);
};

export default fetchData
