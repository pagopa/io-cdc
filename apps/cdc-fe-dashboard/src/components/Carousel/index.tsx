import { CDC } from '../../features/app/model';
import { Card } from '../Card';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box } from '@mui/material';
import { StyledDots } from './styled';

type CarouselProps = {
  list: Array<CDC>;
};

export const Carousel = ({ list }: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visibleIdx = activeIdx;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleIdx = items.indexOf(entry.target as HTMLElement);
          }
        });
        setActiveIdx(visibleIdx);
      },
      { root: container, threshold: Array.from({ length: 101 }, (_, i) => i / 100) },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [list]);

  const onClickDots = useCallback((index: number) => {
    const container = containerRef.current;
    const item = container?.children[index] as HTMLElement;
    item?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  }, []);

  if (list.length === 1) return <Card {...list[0]} />;

  return (
    <Stack sx={{ width: '100%', overflow: 'hidden', py: 2 }}>
      <Stack
        ref={containerRef}
        sx={{
          display: 'flex', // layout in riga
          flexDirection: 'row',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: 2,
          px: 2,
          scrollBehavior: 'smooth',
        }}
      >
        {list.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >
            <Card {...item} />
          </Box>
        ))}
      </Stack>

      {/* Indicator Dots */}
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={2}>
        {list.map((_, idx) => (
          <StyledDots
            key={idx}
            onClick={() => onClickDots(idx)}
            className={activeIdx === idx ? 'active' : 'inactive'}
          />
        ))}
      </Stack>
    </Stack>
  );
};
