import Image from "next/image";

interface BannerProps {
  imgSrc: string;
  title: string;
  text: string;
  target: {
    label: string;
    href: string;
  };
}
const Banner = ({ imgSrc, title, text, target }: BannerProps) => {
  const Overlay = () => {
    return (
      <div className="absolute inset-0 bg-[#FF2C2C] mix-blend-multiply"></div>
    );
  };
  const Content = () => {
    return (
      <div className="relative w-1/2 z-10">
        <h2 className="text-4xl font-extrabold">{title}</h2>
        <p className="my-2">{text}</p>
        {target && (
          <a href={target.href} target="_blank">
            {target.label}
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex items-center h-48 p-4 my-2 rounded-lg text-white overflow-hidden">
      <Image src={imgSrc} alt="Banner background" priority fill />
      <Overlay />
      <Content />
    </div>
  );
};

export default Banner;
