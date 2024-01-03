import { SpotlightCard, Spotlight } from "./Spotlight";

export default function Talks() {
  return (
    <Spotlight className="hidden h-auto w-auto flex-col items-center justify-center lg:h-[25%] xl:flex">
      <SpotlightCard className="box-animation-Causes box-shadow w-full rounded-3xl p-0 lg:w-auto lg:transition-all lg:duration-500 lg:hover:shadow-white/20">
        <div className="group z-20 flex w-full flex-col rounded-3xl border-white/20 lg:w-auto lg:border-2 lg:p-5">
          <h2 className="mb-3 hidden text-2xl font-bold text-white/20 group-hover:text-white lg:block lg:transition-colors lg:duration-500">
            Talks About
          </h2>
          <div className="flex w-full max-w-[350px] flex-col space-y-3">
            <p className="text-pretty text-base font-normal">
              #tech, #sales, #marketing, #management, and #industryinsights
            </p>
          </div>
        </div>
      </SpotlightCard>
    </Spotlight>
  );
}