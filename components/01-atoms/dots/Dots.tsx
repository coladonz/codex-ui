interface DotsProps {
  dots?: number;
}

const Dots = ({ dots = 3 }: DotsProps) => {
  return (
    <div className="flex items-center">
      <span data-dots={dots} className="text-2xl ">
        {[...Array(dots)].map((_, i) => (
          <span
            key={i}
            className={`inline-block motion-safe:animate-fade-in-out`}
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            .
          </span>
        ))}
      </span>
    </div>
  );
};

export default Dots;
