export const SelfHosted = () =>
  process.env.ISSELFHOSTED === "true" && (
    <div className="fixed -right-[4.2rem] top-[2.8rem] z-50 origin-bottom-left rotate-90 transform select-none text-center text-xs text-primary">
      proudly self-hosted
    </div>
  );
