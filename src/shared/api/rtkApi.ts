import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const rtkApi = createApi({
    reducerPath: 'rtkApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
