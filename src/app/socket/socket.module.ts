import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SocketService} from './socket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SocketModule {
  constructor(socketService: SocketService) {
    socketService.init();
  }

  static forRoot() {
    return {
      ngModule: SocketModule,
      providers: [SocketService]
    };
  }
}
