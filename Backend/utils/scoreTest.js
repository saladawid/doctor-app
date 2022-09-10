export const scoreTest = (score) => {
    return Object.values(score).filter(Number).reduce((a, b) => a + b, 0);
};