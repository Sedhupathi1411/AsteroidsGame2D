export const round = (x: number, d = 10) => Math.round(x * d) / d;

export const sin = (x: number) => Math.sin(x);
export const cos = (x: number) => Math.cos(x);
export const tan = (x: number, y?: number) => Math.atan2(y, x);

export const findHyp = (a: number, b: number) => Math.sqrt((a * a) + (b * b));

export const random = (start = 0, end = 1) => {
    let range = end - start;
    let rdm = Math.random();
    return (rdm * range) + start;
}

export const chooseOne = (...arr: any[]) => arr[Math.round(random(0, arr.length - 1))];