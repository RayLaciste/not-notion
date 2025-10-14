import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px] ">
          <Image
            src="/chill.png"
            className="object-contain dark:hidden"
            alt="painting"
            fill
          />
          <Image
            src="/chill-dark.png"
            className="object-contain hidden dark:block"
            alt="painting"
            fill
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <Image
            src="/painting.png"
            className="object-contain dark:hidden"
            alt="painting"
            fill
          />
          <Image
            src="/painting-dark.png"
            className="object-contain hidden dark:block"
            alt="painting"
            fill
          />
        </div>
      </div>
    </div>
  );
};
