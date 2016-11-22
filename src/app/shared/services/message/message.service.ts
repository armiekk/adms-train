import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';

@Injectable()
export class MessageService {

  private msgs: Message[] = [];

  constructor() { }

  successMessage(OptionMessage = '') {
    this.msgs.push({ severity: 'success', summary: 'สำเร็จ', detail: OptionMessage });
  }

  infoMessage(OptionMessage = '') {
    this.msgs.push({ severity: 'info', summary: 'รายงาน', detail: OptionMessage });
  }

  warnMessage(OptionMessage = '') {
    this.msgs.push({ severity: 'warn', summary: 'แจ้งเตือน', detail: OptionMessage });
  }

  errorMessage(OptionMessage = '') {
    this.msgs.push({ severity: 'error', summary: 'มีข้อผิดพลาด', detail: OptionMessage });
  }

}
