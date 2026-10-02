type JobDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-6 py-6">
      <section className="surface-shadow rounded-xl border border-border bg-surface p-6">
        <h1 className="text-base font-semibold text-text-primary">Job Details</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Placeholder for job id: <span className="font-medium">{id}</span>
        </p>
      </section>
    </main>
  );
}
