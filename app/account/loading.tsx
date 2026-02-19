import Spinner from "../_components/ui/Spinner";

export default function Loading() {
  return (
    <div className="w-full grid items-center justify-center">
      <Spinner />
      <span className="text-xl text-center text-slate-700">Almost there</span>
    </div>
  );
}
