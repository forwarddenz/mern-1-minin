import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/authContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = () => {

    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const getLink = async () => {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        };
        getLink()
    }, [token, linkId, request])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}