import { HeroEventos } from "@/components/sections/eventos/hero-eventos";
import { BlockSplit } from "@/components/sections/eventos/block-split";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import type { Dictionary } from "@/lib/i18n";

type Block = Parameters<typeof BlockSplit>[0]["block"];

export function EventosContent({ m }: { m: Dictionary }) {
  const blocks = m.eventos_page.blocks as Block[];

  return (
    <>
      <HeroEventos m={m} />
      {blocks.map((block, i) => (
        <AnimateOnScroll key={i}>
          <BlockSplit block={block} />
        </AnimateOnScroll>
      ))}
    </>
  );
}
