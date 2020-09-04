import {Component, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-adv-task-board',
  templateUrl: './adv-task-board.component.html',
  styleUrls: ['./adv-task-board.component.scss']
})
export class AdvTaskBoardComponent implements OnInit {

  constructor(private dragula: DragulaService) { }

  ngOnInit() {
  }

}
