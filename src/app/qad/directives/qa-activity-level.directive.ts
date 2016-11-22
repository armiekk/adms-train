import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[qaActivityLevel]'
})
export class QaActivityLevelDirective {
    private _activityLevel = 1;

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.renderer.setElementStyle(el.nativeElement, 'border', '0');
        this.renderer.setElementStyle(el.nativeElement, 'padding', '0');
        if(this._activityLevel == 2) {
            this.renderer.setElementStyle(el.nativeElement, 'text-align', 'right');
        }
        else {
            this.renderer.setElementStyle(el.nativeElement, 'text-align', 'center');
        }
        console.log('---Start---');
        console.log(this._activityLevel);
        console.log('---End---');
     }

    @Input() qaActivityLevel(level: number){
        this._activityLevel = level;
        console.log('---Input---');
        console.log(level);
    }
}
