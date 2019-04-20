export class Card {
    title: string;
    dateTime: string;
    data: any;
    uom: string;
    imageurl: string;
    error: Boolean = false;

    singleValueverify(value, max, min) {
        if (value > min && value < max) {
            this.error = false;
            this.data = value;
        }
        else {
            this.error = true;
        }
    }
    multiValueverify(value: any, key: string) {
        this.error = true;
        for (let i = 0; i < value.length - 1; i++) {
            if (value[i][key] == value[i + 1][key]) {
                continue;
            }
            else {
                this.error = false;
                break;
            }
        }
        this.data = Number(value[value.length -1][key]).toFixed(2);
    }
}