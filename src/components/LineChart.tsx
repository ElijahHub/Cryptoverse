import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

type PropsType = {
  coinHistory: {
    data: {
      change: string;
      history: {
        price: string;
        timestamp: string;
      }[];
    };
  };
  currentPrice: string;
  coinName: string;
};

const LineChart = ({ coinHistory, currentPrice, coinName }: PropsType) => {
  const history = coinHistory?.data?.history;

  const coinPrice: string[] = [];
  const coinTimestamp: string[] = [];

  for (let i = 0; i < history.length; i++) {
    coinPrice.push(history[i].price);
    coinTimestamp.push(new Date(history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            {coinHistory?.data?.change}
          </Title>
          <Title level={5} className='current-price'>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options as any} />
    </>
  );
};

export default LineChart;
