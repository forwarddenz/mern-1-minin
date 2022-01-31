import React from 'react';

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Ссылка</h2>

            <p>Ваша ссылка: <a target="_blank" href={link.to} rel='noopener noreferrer' >{link.to}</a></p>
            <p>Откуда: <a target="_blank" href={link.from} rel='noopener noreferrer' >{link.from}</a></p>
            <p>Кол-во кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </>
    )
}