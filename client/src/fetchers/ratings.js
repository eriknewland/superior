import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api/reviews/';

export default {
  // Default sort is 'Relevant', default count set to 2
  getReviews: (id) => {
    const options = {
      url: SERVER_BASEURL,
      method: 'get',
      params: { product_id: id, count: 200 },
    };

    return axios(options);
  },

  getReviewMeta: (id) => {
    const options = {
      url: `${SERVER_BASEURL}meta`,
      method: 'get',
      params: { product_id: id },
    };

    return axios(options);
  },

  updateUseful: (id) => {
    const options = {
      url: `${SERVER_BASEURL}${id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },
  updateReport: (id) => {
    const options = {
      url: `${SERVER_BASEURL}${id}/report`,
      method: 'put',
    };

    return axios(options);
  },
  addReviews: (review) => {
    const options = {
      url: SERVER_BASEURL,
      method: 'post',
      data: review, //not sure if data or body
    };

    return axios(options);
  },
};
