import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class BlogModule { }
