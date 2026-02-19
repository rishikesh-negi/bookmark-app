import Button from "./_components/ui/Button";

export default function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Uh oh! This page could not be found
      </h1>
      <Button href="/">Go back home</Button>
    </main>
  );
}
