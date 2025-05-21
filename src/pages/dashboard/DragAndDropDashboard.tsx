import React, { useEffect, useState } from 'react';

import {
    DragDropContext,
    Draggable,
    Droppable,
} from 'react-beautiful-dnd';
import { Chart } from 'react-google-charts';
import _ from 'lodash'

import useAnalytics from '../../hooks/useAnalytics';
import {
    ChartData,
    ConversationStatusSummary,
    UserActivityReport,
} from '../../types/analytics/analyticsTypes';
import useAuth from '../../hooks/useAuth';
import DashboardChart from './DashboardChart';

interface Props {
    dashboardName: string;
    data: ChartData[];
    
}
const DragAndDropDashboard = ({dashboardName, data}: Props) => {
    const { campaignAnalytics, contactsUnsubscriptionRateAnalytics, deviceUsageAndEngagementAnalytics, userActivityReport, conversationStatusSummary } = useAnalytics();
    const { user } = useAuth();
    // State to hold the chart data
    const [charts, setCharts] = useState(data);
    useEffect(() => {
        const savedChartData = localStorage.getItem(`spasms_${user?.Id}_${dashboardName}`)
        if(savedChartData) {
            const parsed = JSON.parse(savedChartData)
            setCharts(data)
        } else {
            setCharts(data)
        }
    }, [dashboardName])

    // Handle drag end event
    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const updatedCharts = [...charts];
        const movedChart = updatedCharts.splice(result.source.index, 1)[0];
        const destinationIndex = result.destination.index;

        if (result.source.droppableId !== result.destination.droppableId) {
            // If moving from one board to another, add to the destination board
            const destinationBoardIndex = parseInt(result.destination.droppableId.substr(5)) - 1; // Extract board number from droppableId
            updatedCharts.splice(destinationIndex, 0, movedChart);
            setCharts(updatedCharts);
        } else {
            // If moving within the same board, simply reorder the charts
            updatedCharts.splice(destinationIndex, 0, movedChart);
            setCharts(updatedCharts);
        }
        const json = JSON.stringify(updatedCharts)
        localStorage.setItem(`spasms_${user?.Id}_${dashboardName}`, json);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {[1, 2, 3].map((boardNumber) => (
                    <Droppable claskey={boardNumber} droppableId={`board${boardNumber}`} direction="vertical">
                        {(provided: any) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ flex: '1', margin: '0 0px' }}
                            >
                                {charts.filter((chart: any, index: number) => {
                                    const startIndex = (boardNumber - 1) * 2;
                                    const endIndex = startIndex + 2;
                                    return index >= startIndex && index < endIndex;
                                }).map((chart: any, index: number) => (
                                    <Draggable key={chart.id} draggableId={chart.id} index={index + (boardNumber - 1) * 2}>
                                        {(provided: any) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div
                                                    className='mb-5 p-2 me-1d-flex justify-content-center'
                                                >
                                                    <DashboardChart
                                                        chartType={chart.chartType}
                                                        data={chart.data}
                                                        title={chart.title}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default DragAndDropDashboard;
