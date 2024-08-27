import { Component, OnInit } from '@angular/core';
import { interval, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Use styleUrls (plural) with square brackets
})
export class AppComponent {
 
  title = 'Angular-Project';

  // data: any[] = [];
  // private subscription!: Subscription;

  // constructor(private dataService: DataService) {}

  // ngOnInit(): void {
  //   // Polling every 5 seconds
  //   this.subscription = interval(5000).pipe(
  //     switchMap(() => this.dataService.getData())
  //   ).subscribe(data => {
  //     this.data = data;
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

}
