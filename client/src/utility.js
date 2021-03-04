export const getToken = () => {
    if (document.cookie.includes('token')) {
        return document.cookie.split('=')[1];
    } else {
        return undefined;
    }
}
