import { Box } from '@mui/material';
import {
  VictoryBrushContainer,
  VictoryArea,
  VictoryLine,
  VictoryGroup,
  VictoryAxis,
} from 'victory';

interface Props {
  retireAge: number;
  presentAge: number;
}

interface IGraphData {
  x: number;
  y: number;
}

const Chart = (props: Props): JSX.Element => {
  const { retireAge, presentAge } = props;

  const generatGraphObject = (
    currentAge: number,
    areaType: string,
  ): IGraphData[] => {
    const numberOfNode = 13;
    const maxAge = 80;
    const differenceValue = (maxAge - currentAge) / numberOfNode;
    const returns = [3, 5, 9, 16, 27, 44, 64, 90, 120, 155, 192, 232, 269];
    const government = [2, 3, 5, 10, 18, 28, 41, 59, 80, 107, 136, 166, 202];
    const savings = [1, 1, 2, 5, 10, 15, 22, 30, 42, 57, 76, 102, 130];
    const yAxisArry =
      areaType === 'returns'
        ? returns
        : areaType === 'government'
        ? government
        : savings;

    const GraphData: IGraphData[] = [];

    for (let i = 0; i < numberOfNode; i++) {
      if (i < 1) {
        GraphData[i] = {
          x: currentAge - 1,
          y: i > 0 ? yAxisArry[i - 1] : 0,
        };
        currentAge += differenceValue;
      } else {
        currentAge += differenceValue;
        GraphData[i] = {
          x: currentAge - 1,
          y: i > 0 ? yAxisArry[i - 1] : 0,
        };
      }
    }
    return GraphData;
  };

  return (
    <Box maxWidth={500}>
      <VictoryGroup
        height={350}
        width={450}
        containerComponent={
          <VictoryBrushContainer
            allowDrag={false}
            allowResize={false}
            brushDomain={{
              x: [retireAge - 1, retireAge],
            }}
            brushStyle={{
              stroke: '#1A6A73',
              fill: '#1A6A73',
            }}
          />
        }
      >
        <VictoryArea
          interpolation="natural"
          data={generatGraphObject(presentAge, 'returns')}
          style={{ data: { fill: '#FADE93' } }}
        />
        <VictoryLine
          data={generatGraphObject(presentAge, 'returns')}
          interpolation="natural"
          style={{
            data: { stroke: '#FADE93' },
          }}
        />
        <VictoryArea
          interpolation="natural"
          data={generatGraphObject(presentAge, 'government')}
          style={{ data: { fill: '#E15B2D' } }}
        />
        <VictoryLine
          data={generatGraphObject(presentAge, 'government')}
          interpolation="natural"
          style={{
            data: { stroke: '#E15B2D' },
          }}
        />
        <VictoryArea
          interpolation="natural"
          data={generatGraphObject(presentAge, 'savings')}
          style={{ data: { fill: '#78B894' } }}
        />
        <VictoryLine
          data={generatGraphObject(presentAge, 'savings')}
          interpolation="natural"
          style={{
            data: { stroke: '#78B894' },
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 10 },
          }}
          tickValues={[presentAge, 80]}
          tickFormat={(t) => `Age ${String(t)}`}
        />
      </VictoryGroup>
    </Box>
  );
};

export default Chart;
