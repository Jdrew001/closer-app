export class ArrayUtils {
    public static getMedianFromArrayLength(array: Array<any>): number {
        return Math.floor(array.length / 2);
    }
}