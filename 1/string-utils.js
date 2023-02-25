export function toLowerAndFirstUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatSpaces(str) {
    let result = '';
    let last = str.charAt(0);

    for (let i = 1; i < str.length; i++) {
        let cur = str.charAt(i);

        if (last === ' ' && cur === ' ') {
            continue;
        }

        if (last === ' ' && (cur === ',' || cur === '.')) {
            result[-1] = cur;
        } else if ((last === ',' || last === '.') && cur !== ' ') {
            result += last + ' ';
        } else {
            result += last;
        }

        last = cur;
    }

    return result + last;
}

export function countWords(str) {
    const words = str.split(' ');
    return words.filter(word => word !== '').length;
}

export function countUniqueWords(str) {
    const words = str.split(' ');
    let countWords = new Map();

    words.filter(word => word !== '')
        .map(word => word.toLowerCase())
        .map(word => (word.endsWith(',') || word.endsWith('.')) ? word.slice(0, word.length - 1) : word)
        .forEach(word => {
            let count = countWords.get(word) || 0;
            countWords.set(word, count + 1)
        });

    return countWords;
}