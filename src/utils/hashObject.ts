export const hashObject = async (object: Object) => {
    const crypto = window.crypto.subtle;
    const userBuffer = new TextEncoder().encode(JSON.stringify(object));
    const hashBuffer = await crypto.digest('SHA-256', userBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return  hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
