import moment from 'moment';
// export const date = (dateOfAdmission) => {
//     const newDate = new Date().toLocaleDateString();
//     const dateFormat = newDate.split('.');
//     const [day, month, year] = dateFormat;
//     const currentDate = day.length === 1 ? `${year}-${month}-0${day}` : `${year}-${month}-${day}`;
//
//     if(dateOfAdmission) {
//         return dateOfAdmission
//     } else {
//         return currentDate
//     }
// };

export const date = (dateOfAdmission) => {
    const currentDate = moment().format('YYYY-MM-DD');
    return dateOfAdmission ? dateOfAdmission : currentDate;
};

export const dateAndHour = () => {
    const newDate = new Date().toLocaleDateString();
    const hour = new Date().toLocaleTimeString();
    return `${newDate} ${hour}`;
};

export const currentDate = () => {
    return moment().format('YYYY-MM-DD');
};


