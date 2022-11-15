import React from 'react';

export const TableHead = ({th_1, th_2, th_3, th_4}) => {
    return (
        <thead>
        <tr>
            <th>{th_1}</th>
            <th>{th_2}</th>
            <th>{th_3}</th>
            <th>{th_4}</th>
        </tr>
        </thead>
    )
};