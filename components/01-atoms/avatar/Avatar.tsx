import Image from "next/image";

interface AvatarProps {
  src: string;
}

export const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="relative w-16 h-16 rounded-full border border-gray-400">
      {src && (
        <Image src={src} alt="Avatar" style={{ objectFit: "cover" }} fill />
      )}
    </div>
  );
};

// export default Avatar;
