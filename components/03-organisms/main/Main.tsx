interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="min-h-screen pl-64 pt-[76px] dark:bg-midnight-200 text-midnight-200 dark:text-white">
      <div className="p-4">{children}</div>
    </main>
  );
};

export default Main;
