export function About() {
  return (
    <>
      <h1 className="text-2xl font-bold">Why this app exists</h1>
      <p className="mt-2">
        This is a dumb little app we put together to demonstrate how to use
        TailwindCSS with TypeScript, React, and Vite. It mainly serves as a
        reference for us to use in future projects.
        <br />
        <br />
        It manages a json-server micro backend through TanStack React Query, and
        uses other TypeScript technologies in the frontend like Zod, React Hook
        Form and TanStack Router. We built it according to the Bulletproof React
        philosophy.
      </p>
    </>
  );
}
