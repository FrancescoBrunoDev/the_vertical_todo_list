export const SelfHosted = () => {
  const isSelfhosted = process.env.ISSELFHOSTED === "true";
  if (!isSelfhosted) return null;

  return (
    <div className="pointer-events-none fixed -right-20 top-[3.7rem] z-50 origin-top-left rotate-90 transform text-center text-xs text-primary">
      proudly self-hosted
    </div>
  );
};
