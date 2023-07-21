interface ProgressProps {
  progress: number;
  style?: React.CSSProperties;
}

const Progress = ({ progress, style }: ProgressProps) => {
  return (
    <div style={style}>
      <span style={{ transform: `scaleX(${progress}%)` }} />
    </div>
  );
};

export default Progress;
