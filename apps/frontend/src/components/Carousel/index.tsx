import { Card } from '../Card';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CarouselContainer, ScrollArea, SlideBox, StyledDots } from './styled';
import { Stack } from '@mui/material';
import { Card as CardType } from '../../features/app/model';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { Icon } from '@io-cdc/ui';

type CarouselProps = {
  list: Array<CardType>;
};
export const Carousel = ({ list }: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const visibleIndex = Math.round(scrollLeft / containerWidth);
        setActiveIdx(visibleIndex);
        trackWebviewEvent('CDC_CARD_SWIPE');
      }, 0);
    };
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [list]);

  const onClickDots = useCallback((index: number) => {
    const container = containerRef.current;
    const item = container?.children[index] as HTMLElement;
    item?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  }, []);

  if (list.length === 1)
    return (
      <CarouselContainer>
        <Card {...list[0]} />
      </CarouselContainer>
    );

  return (
    <CarouselContainer>
      <ScrollArea ref={containerRef}>
        {list.map((item, idx) => (
          <SlideBox key={idx}>
            <Card {...item} />
          </SlideBox>
        ))}
      </ScrollArea>

      <Stack direction="row" justifyContent="space-between">
        <Icon
          name="chevronLeft"
          onClick={() => {
            onClickDots(activeIdx - 1);
          }}
        />
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {list.map((_, idx) => (
            <StyledDots
              key={idx}
              onClick={() => onClickDots(idx)}
              className={activeIdx === idx ? 'active' : 'inactive'}
            />
          ))}
        </Stack>
        <Icon
          name="chevronRight"
          onClick={() => {
            onClickDots(activeIdx + 1);
          }}
        />
      </Stack>
    </CarouselContainer>
  );
};
