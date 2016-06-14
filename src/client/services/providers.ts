import { provide } from '@angular/core';

import { SocketService } from './socket';
import { UserService } from './user';

export const SERVICE_PROVIDERS: any[] = [
    SocketService,
    UserService
];