type LoadingProps = {
  loading?: boolean;
};

const Loading = ({ loading = true }: LoadingProps) => {
  if (!loading) return null;
  return (
    <div className="w-full animate-pulse border border-yellow-800 bg-yellow-400 p-2 text-center text-yellow-900">
      Loading…
    </div>
  );
};

export default Loading;
