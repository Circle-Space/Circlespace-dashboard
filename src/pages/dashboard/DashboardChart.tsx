import React from "react"
import { Chart } from 'react-google-charts';

interface Props {
  chartType: any;
  data: any[];
  title: string;
  FooterComponent?: React.ComponentType
}

const DashboardChart = ({
  chartType, data, title, FooterComponent
}: Props) => {
  return (
    <div>
      <Chart
        width={'500px'}
        height={'350px'}
        chartType={chartType}
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
            title: `${title} - Chart`,
        }}
      />
      {FooterComponent && (
        <FooterComponent />
      )}
    </div>
  )
}

export default DashboardChart