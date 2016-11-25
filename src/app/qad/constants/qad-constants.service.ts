import { Injectable } from '@angular/core';

@Injectable()
export class QadConstantsService {
    private _workCategory: Array<{ label: string, value: number }>;
    private _documentCMMIType: Array<{ label: string, value: number }>;

    constructor() {
        this._workCategory = [
            {label: "Audit", value: 1},
            {label: "Re-audit", value: 2},
            {label: "Other", value: 3}
        ];

        this._documentCMMIType= [
            { label: "PM", value: 1 },
            { label: "SYSTEM", value: 2 },
            { label: "BI", value: 3 }
        ];
    }

    get workCategory(): Array<{ label: string, value: number }> {
        return this._workCategory;
    }

    get documentCMMIType(): Array<{ label: string, value: number }> {
        return this._documentCMMIType;
    }
}
