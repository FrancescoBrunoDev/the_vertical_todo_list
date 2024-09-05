import { PPR } from "@/app/fonts";

export const Header = () => {
  return (
    <div className="fixed inset-x-0 -top-8 z-50 scale-75 bg-background pb-0 md:pb-8">
      <h2
        className={`${PPR.className} flex w-full justify-center p-2 text-center font-black`}
      >
        <div className="relative">
          <span
            className="absolute -left-8 top-[0.7rem] text-[1.5rem] uppercase leading-[-2.85rem] tracking-[-0.18rem] text-primary"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
            }}
          >
            Vertical
          </span>
          <span className="text-8xl">The</span>
          <br />
          <span className="text-[3.6rem] uppercase leading-[1] text-primary">
            Todo
          </span>
          <br />
          <span className="text-7xl uppercase text-primary">List</span>
        </div>
      </h2>
    </div>
  );
};
