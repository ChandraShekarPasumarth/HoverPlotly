import { AfterViewInit, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import * as Plotly from 'plotly.js-dist';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
})
export class PlotComponent implements AfterViewInit {
  constructor() {}
  @ViewChild('myDiv', { static: true }) myDiv: ElementRef;
  ngAfterViewInit() {
    var trace1 = {
      type: 'scatter',
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'lines',
      name: 'Red',
      line: {
        color: 'rgb(219, 64, 82)',
        opacity: 0,
        width: 3,
      },
    };
    var trace2 = {
      type: 'scatter',
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines',
      name: 'Blue',
      line: {
        color: 'rgb(55, 128, 191)',
        opacity: 0,
        width: 1,
      },
    };

    var layout: {
      hovermode: 'closest';
      title: 'Hover on a line to change the colour';
    };

    var data = [trace1, trace2];

    var tempData = JSON.parse(JSON.stringify(data));

    Plotly.newPlot(this.myDiv.nativeElement, data, layout);

    this.myDiv.nativeElement.on('plotly_hover', function (hover_data) {
      console.log(hover_data);
      var index = hover_data.points[0].curveNumber;
      var update = {
        'line.color': 'rgb(102, 255, 51)',
      };
      Plotly.restyle('myDiv', update, [index]);
    });

    this.myDiv.nativeElement.on('plotly_unhover', function (unhover_data) {
      var index = unhover_data.points[0].curveNumber;
      var update = {
        'line.color': tempData[index].line.color,
      };
      Plotly.restyle('myDiv', update, [index]);
    });
  }
}
