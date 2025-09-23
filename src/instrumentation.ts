export async function register() {
  console.log(`[Instrumentation] Begin register`);

  const runtime = process.env.NEXT_RUNTIME;

  console.log(`[Instrumentation] Runtime: ${runtime}`);

  if (runtime === 'nodejs') {
    //
  }

  if (runtime === 'edge') {
    //
  }

  console.log(`[Instrumentation] End register`);
}
