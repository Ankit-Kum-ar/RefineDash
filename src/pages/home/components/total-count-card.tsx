import { Text } from "@/components/text";
import { totalCountVariants } from "@/constants";
import { Area, AreaConfig } from "@ant-design/plots";
import { Card, Skeleton } from "antd";

type Props = {
  resource: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount?: number;
}

const DashboardTotalCountCard = ({ resource, isLoading, totalCount }: Props) => {
    const {primaryColor, secondaryColor, icon, title} = totalCountVariants[resource]; // primaryColor, secondaryColor, icon, title from totalCountVariants
    const config: AreaConfig = { // AreaConfig type
        data: totalCountVariants[resource].data, // data from totalCountVariants data
        xField: 'index', // xField is index
        yField: 'value', // yField is value
        appendPadding: [1, 0, 0, 0], // appendPadding 1 top, 0 right, 0 bottom, 0 left
        padding: 0, // padding 0 means no padding
        syncViewPadding: true, // syncViewPadding true means sync the view padding
        autoFit: true, // autoFit true means auto fit the chart
        tooltip: false, // tooltip false means no tooltip
        animation: false, // animation false means no animation
        xAxis: false, // xAxis false means no x axis
        yAxis: {
            tickCount: 12, // tickCount 12 means 12 ticks on y axis 
            label: {
                style: {
                    stroke: 'transparent' // stroke means transparent label
                }
            },
            grid: {
                line: {
                    style: {
                        stroke: 'transparent' // stroke color is transparent
                    }
                }
            }
        },
        smooth: true, // smooth true means smooth the chart
        line: {
            color: primaryColor, // color is primaryColor
        },
        areaStyle: () => { // areaStyle function
            return { fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}` }; // This line means that the area will be filled with a linear gradient that starts at 0% with white color and ends at 20% with secondaryColor and ends at 100% with primaryColor
        }
    }
    return (
        <Card
            style={{height: "96px", padding: 0}} // 96px height, 0 padding
            bodyStyle={{ padding: '8px 8px 8px 12px' }} // 8px padding top, 8px padding left and right, 12px padding bottom
            size="small" // small size
        >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'            
            }}
        >
            {icon} {/* icon */}
            <Text size="md" className="secondary" style={{marginLeft: '8px'}}>
                {title} 
            </Text>
        </div>
        <div
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <Text
                size="xxxl" // xxxl size
                strong
                style={{
                    flex: 1, // flex 1 means it will take the remaining space
                    whiteSpace: 'nowrap', // whiteSpace nowrap will prevent the text from wrapping
                    flexShrink: 0, // flexShrink 0 will prevent the text from shrinking
                    textAlign: 'start', // text align start will align the text to the start
                    marginLeft: '48px', // 48px margin left
                    fontVariantNumeric: 'tabular-nums', // fontVariantNumeric tabular-nums will align the numbers properly
                }}
            >
                {isLoading ? ( // isLoading condition
                    <Skeleton.Button
                        style={{
                            marginTop: '8px',
                            width: '74px',
                        }}
                    />
                ) : (
                    totalCount
                )}
            </Text>
            <Area {...config} style={{width: '50%'}}/>
        </div>
        </Card>
    )
}

export default DashboardTotalCountCard
