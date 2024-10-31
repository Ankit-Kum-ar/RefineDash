import React from "react";
import { Text } from "@/components/text"
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries";
import { mapDealsData } from "@/utilities/helpers";
import { DollarOutlined } from "@ant-design/icons"
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { Card } from "antd"
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "@/graphql/types";

const DealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({ // GetFieldsFromList type from the DashboardDealsChartQuery query
    resource: "dealStages", // dealStages resource from the refined db
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY, // DASHBOARD_DEALS_CHART_QUERY query 
    }
  }); // useDeals hook

  // Use of React.useMemo to memoize the data. This is to prevent the data from being recalculated on every render. 
  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data); // mapDealsData function
  }, [data?.data]); // data dependency


  const config: AreaConfig = {
    data: dealData, // data used to display the chart
    xField: 'timeText', // xField used to display the timeText
    yField: 'value', // yField used to display the value
    isStack: false, // isStack will stack the data
    seriesField: 'state', // seriesField will group the data by state
    animation: true, // animation will animate the chart
    smooth: true, // smooth will smooth the chart using bezier curve
    startOnZero: false, // startOnZero will start the chart on zero
    legend: { // legend configuration
      offsetY: -9 // The function of offsetY is to adjust the position of the legend.
    },
    yAxis: { // yAxis configuration
      tickCount: 5, // tickCount will display 5 ticks
      label: { // label configuration
        formatter: (v: string) => { // formatter function
          return `$${Number(v) / 1000}k`; // return v with key $ and Number
        },
      },
    },
    tooltip: { // tooltip configuration used to display the tooltip when hovering over the chart
      formatter: (datum: any) => { // formatter function
        return { // return object
          name: datum.state, // name is datum.state
          value: `$${Number(datum.value) / 1000}k`, // value is $ and Number
        };
      },
    },
  };
  
  return (
    <Card // Card component
      style={{height: "100%"}} // 100% height
      headStyle={{ padding: '8px 16px' }} // 8px padding top and bottom, 16px padding left and right
      bodyStyle={{ padding: '24px 24px 0 24px' }} // 24px padding top, 24px padding left and right, 0 padding bottom
      title= { // title
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <DollarOutlined/> {/* DollarOutlined icon */}
          <Text size="sm" style={{marginLeft: '0.5rem'}}> {/* Text component */}
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
    // <>
    // </>
  )
}

export default DealsChart
