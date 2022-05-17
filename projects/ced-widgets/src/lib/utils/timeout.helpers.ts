export class TimeoutHelpers {
    public static sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}