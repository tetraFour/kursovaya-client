const palette = [
  "#4791db",
  "#1976d2",
  "#115293",
  "#e33371",
  "#dc004e",
  "#9a0036",
  "#e57373",
  "#f44336",
  "#d32f2f",
  "#ffb74d",
  "#ff9800",
  "#f57c00",
  "#64b5f6",
  "#2196f3",
  "#1976d2",
  "#81c784",
  "#4caf50",
  "#388e3c",
];
const getRandomColor = () =>
  palette[Math.floor(Math.random() * palette.length)];

export default getRandomColor;
