import { jwtDecode } from 'jwt-decode';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({cookies}) => {
    const token = cookies.get('token');

    return {
        user: token ? jwtDecode(token) : null
    };
}