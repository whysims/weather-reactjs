import React, { useState } from "react";
import { CardContent, Button } from "@material-ui/core";
import {
  FlexibleXYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines
} from "react-vis";

const StatisticsWeather = props => {
  const [data, setData] = useState();

  return (
    <CardContent className="weather-card">
      <Button variant="outlined" className="btn" onClick={() => setData(props.getMin())}>
        Minimum Temperature
      </Button>
      <Button variant="outlined" className="btn" onClick={() => setData(props.getMax())}>
        Maximum Temperature
      </Button>
      <Button variant="outlined" className="btn" onClick={() => setData(props.getMean())}>
        Mean Temperature
      </Button>
      <Button variant="outlined" className="btn">
        Mode Temperature
      </Button>

      <div>
        {data && (
          <FlexibleXYPlot height={300} xType="ordinal">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={data}></LineSeries>
          </FlexibleXYPlot>
        )}
      </div>
    </CardContent>
  );
};
export default StatisticsWeather;
