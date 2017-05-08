import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// App component
import { AppComponent } from './app.component';

// Core module
import { CoreModule } from './core';

// Shared module
import { SharedModule } from './shared';

// Other components
import { ControlComponent } from './control';
import { HeaderComponent } from './header';
import { NicknameComponent } from './nickname';
import { RoomComponent } from './room';
import { RoomsComponent } from './rooms';

@NgModule({
  imports: [
    CoreModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    ControlComponent,
    HeaderComponent,
    NicknameComponent,
    RoomComponent,
    RoomsComponent
  ],
  exports: [
    CoreModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
