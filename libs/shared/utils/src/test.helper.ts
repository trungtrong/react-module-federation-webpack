export class TestHelper {
    static count = 1;

    public static getCount() {
        return this.count;
    }

    public static decreaseCount() {
        this.count -= 1;
    }

    public static increaseCount() {
        console.log('process.env', process.env);
        this.count += 1;
    }
}
