import Image from "next/image";

type FeatureSplitProps = {
  title: string;
  points: Array<{
    heading: string;
    body: string;
  }>;
  imageSrc: string;
  imageAlt: string;
  imageOnLeft?: boolean;
};

export function FeatureSplit({
  title,
  points,
  imageSrc,
  imageAlt,
  imageOnLeft = false,
}: FeatureSplitProps) {
  const textSection = (
    <div className="flex h-full flex-col justify-center p-10">
      <h2 className="max-w-[360px] text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-text-slate">
        {title}
      </h2>
      <div className="mt-10 space-y-7">
        {points.map((point) => (
          <div key={point.heading}>
            <h3 className="text-base font-semibold text-text-slate">{point.heading}</h3>
            <p className="mt-2 max-w-[430px] text-sm leading-6 text-text-secondary">
              {point.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const mediaSection = (
    <div className="border-border bg-surface-secondary p-8">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1024}
          height={768}
          className="h-auto w-full"
        />
      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-2 border border-border bg-surface">
      {imageOnLeft ? mediaSection : textSection}
      <div className="border-l border-border">
        {imageOnLeft ? textSection : mediaSection}
      </div>
    </section>
  );
}
