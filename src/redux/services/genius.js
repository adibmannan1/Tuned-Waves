import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const geniusApi = createApi({
    reducerPath: 'geniusApi',
    baseQuery: fetchBaseQuery({
        baseUrl : 'https://genius-song-lyrics1.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '37334518dfmshf3643bd84abc70ap1788cbjsn8ab512155e5f')
            return headers
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => ({
                url: '/chart/songs/',
                params: {
                  per_page: '50',
                  page: '1',
                },
            }),
        }),
        getSongDetails: builder.query({query: ({songid}) => `/song/details/?id=${songid}`}),
        getSongRelated:  builder.query({query: ({songid}) => `/song/recommendations/?id=${songid}`}),
        getArtistDetails:  builder.query({query: (artistId) => `/artist/songs/?id=${artistId}&per_page=5&page=1`}),
        getSongsBySearch:  builder.query({query: (searchTerm) => `/search/?q=${searchTerm}&per_page=5&page=1`})
    })
})

export const {useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery, useGetSongsBySearchQuery} = geniusApi;







