import { HeroMatrimonios } from "@/components/sections/matrimonios/hero-matrimonios";
import { BlockSplit } from "@/components/sections/eventos/block-split";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import type { Dictionary } from "@/lib/i18n";

type Block = Parameters<typeof BlockSplit>[0]["block"];

export function MatrimoniosContent({ m }: { m: Dictionary }) {
  const blocks = m.matrimonios_page.blocks as Block[];

  return (
    <>
      <HeroMatrimonios m={m} />
      {blocks.map((block, i) => (
        <AnimateOnScroll key={i}>
          <BlockSplit block={block} />
        </AnimateOnScroll>
      ))}
    </>
  );
}
