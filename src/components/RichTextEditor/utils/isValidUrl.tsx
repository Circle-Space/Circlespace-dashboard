export function isValidUrl(link: string) {
    let url;
    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }
    const protocols = ["http", "https", "mailto", "sms", "tel"];
    if (!protocols.includes(url.protocol.replace(/:$/, ""))) {
        return false;
    }
    if (url.protocol === "http:" || url.protocol === "https:") {
        const hostnameParts = url.hostname.split(".");
        if (hostnameParts.length < 2) {
            return false;
        }
        const tld = hostnameParts[hostnameParts.length - 1];
        const validTlds = ["com", "net", "org", "edu", "gov"];
        if (!validTlds.includes(tld)) {
            return false;
        }
    }
    return true;
}
