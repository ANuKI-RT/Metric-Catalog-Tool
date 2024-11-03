/**
 * Return an escaped version of the string passed
 * @param string 
 */
export function escapeXmlChars(string: string) {
    return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}