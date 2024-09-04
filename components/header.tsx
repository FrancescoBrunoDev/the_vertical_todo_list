import { PPR } from "@/app/fonts";

export const Header = () => {
  return (
    <h2
      className={`${PPR.className} flex w-full justify-center p-2 text-center font-black`}
    >
      <span
        className="text-[1.5rem] uppercase text-primary"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          letterSpacing: -3,
        }}
      >
        Vertical
      </span>
      <div>
        <span className="text-8xl">The</span>
        <br />
        <span className="text-6xl uppercase text-primary">Todo</span>
        <br />
        <span className="text-7xl uppercase text-primary">List</span>
      </div>
    </h2>
  );
};
