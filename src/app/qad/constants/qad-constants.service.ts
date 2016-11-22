import { Injectable } from '@angular/core';

@Injectable()
export class QadConstantsService {
    private _workCategory: Array<{ label: string, value: number }>;

    constructor() {
        this._workCategory = [
            {label: "Audit", value: 1},
            {label: "Re-audit", value: 2},
            {label: "Other", value: 3}
        ];
    }

    get workCategory(): Array<{ label: string, value: number }> {
        return this._workCategory;
    }
}
