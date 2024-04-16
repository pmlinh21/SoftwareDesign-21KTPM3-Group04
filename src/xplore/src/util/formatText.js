export const formatCapitalCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, function(letter) {
        return letter.toUpperCase();
    });
}