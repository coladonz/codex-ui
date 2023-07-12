import Image from "next/image";

const Loader = () => {
  return (
    <div>
      <Image src="/watermarks/dark.png" alt="Loading.." />
    </div>
  );
};

export default Loader;
