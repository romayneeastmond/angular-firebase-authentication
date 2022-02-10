import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ValidatorService {
    constructor() {

    }

    compare(errors: any[], value: string, compareValue: string, message: string, key?: string, labels?: Map<string, boolean>) {
        if (!value || !compareValue || (value && value.length === 0) || (compareValue && compareValue.length === 0)) {
            errors.push(message);

            if (key && labels) {
                labels.set(key, true);
            }
        } else {
            if (value !== compareValue) {
                errors.push(message);

                if (key && labels) {
                    labels.set(key, true);
                }
            } else {
                if (key && labels) {
                    labels.set(key, false);
                }
            }
        }
    }

    formatEmailAddress(errors: any[], emailAddress: string, message: string, key?: string, labels?: Map<string, boolean>) {
        const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailAddress || (emailAddress && !regularExpression.test(emailAddress.toLowerCase()))) {
            errors.push(message);

            if (key && labels) {
                labels.set(key, true);
            }
        } else {
            if (key && labels) {
                labels.set(key, false);
            }
        }
    }

    length(errors: any[], value: string, length: number, message: string, key?: string, labels?: Map<string, boolean>) {
        if (!value || (value && value.length === 0)) {
            errors.push(message);

            if (key && labels) {
                labels.set(key, true);
            }
        } else {
            if (value.length < length) {
                errors.push(message);

                if (key && labels) {
                    labels.set(key, true);
                }
            } else {
                if (key && labels) {
                    labels.set(key, false);
                }
            }
        }
    }

    required(errors: any[], value: string, message: string, key?: string, labels?: Map<string, boolean>) {
        if (!value || (value && value.length === 0)) {
            errors.push(message);

            if (key && labels) {
                labels.set(key, true);
            }
        } else {
            if (key && labels) {
                labels.set(key, false);
            }
        }
    }
}
