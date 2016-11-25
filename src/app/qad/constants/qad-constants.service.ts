import { Injectable } from '@angular/core';

@Injectable()
export class QadConstantsService {
    private _projectType: Array<{ label: string, value: number }>;
    private _workCategory: Array<{ label: string, value: number }>;
    private _notify: Array<{ label: string, value: number }>;
    private _documentCMMIType: Array<{ label: string, value: number }>;

    constructor() {
        this._projectType = [
            { label: "Pre Contact", value: 1},
            { label: "Contact", value: 2 },
            { label: "In-house", value: 3 }
        ];

        this._workCategory = [
            { label: "Audit", value: 1 },
            { label: "Re-audit", value: 2 },
            { label: "Other", value: 3 }
        ];

        this._notify = [
             { label: "ADMS", value: 1 },
            { label: "Email", value: 2 }
        ];

        this._documentCMMIType= [
            { label: "PM", value: 1 },
            { label: "SYSTEM", value: 2 },
            { label: "BI", value: 3 }
        ];
    }

    get projectType(): Array<{ label: string, value: number }> {
        return this._projectType;
    }

    get notify(): Array<{ label: string, value: number }> {
        return this._notify;
    }

    get workCategory(): Array<{ label: string, value: number }> {
        return this._workCategory;
    }

    get documentCMMIType(): Array<{ label: string, value: number }> {
        return this._documentCMMIType;
    }
}
