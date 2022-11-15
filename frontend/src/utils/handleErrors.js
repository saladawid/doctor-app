export const handleError = (error) => {
    console.log(error);
    return error.response && error.response.data.message ? error.response.data.message : 'Please try again later';
}



