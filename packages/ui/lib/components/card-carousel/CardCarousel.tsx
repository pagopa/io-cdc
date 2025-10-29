import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { CardCarouselItem } from "./CardCarouselItem";
import { CardCarouselNavigationButton } from "./CardCarouselNavigationButton";

export interface CardCarouselProps {
  children: React.ReactNode;
  title: string;
}

export const CardCarousel = ({ children, title }: CardCarouselProps) => (
  <Card
    sx={{
      ".io-cdc-hidden": {
        display: "none",
      },
    }}
  >
    <CardHeader
      action={
        <>
          <CardCarouselNavigationButton
            aria-label="button-prev-slide"
            className="io-cdc-swiper-button-prev"
            icon="arrowCircleLeftBold"
          />
          <CardCarouselNavigationButton
            aria-label="button-next-slide"
            className="io-cdc-swiper-button-next"
            icon="arrowCircleRightBold"
          />
        </>
      }
      disableTypography
      title={
        <Typography fontSize={20} fontWeight={600}>
          {title}
        </Typography>
      }
    />
    <CardContent sx={{ p: 2, pt: 0 }}>
      <Stack
        sx={{
          "& .swiper": {
            height: "100%",
            width: "100%",
          },
          ".swiper-slide": {
            height: "auto",
            width: "fit-content",
          },
        }}
      >
        <Swiper
          className="io-cdc-swiper"
          modules={[Pagination, Navigation]}
          navigation={{
            disabledClass: "Mui-disabled",
            lockClass: "io-cdc-hidden",
            nextEl: ".io-cdc-swiper-button-next",
            prevEl: ".io-cdc-swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".io-cdc-swiper-pagination",
          }}
          spaceBetween={30}
        >
          {React.Children.map(children, (child: React.ReactNode, index) => (
            <SwiperSlide key={`slide-${index}`}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </Stack>
      <Box
        className="io-cdc-swiper-pagination"
        component="div"
        display="flex"
        justifyContent="center"
        paddingTop={2}
        sx={{
          "& .swiper-pagination-bullet-active": {
            backgroundColor: "#0073E6",
            borderRadius: "15px",
            height: 4,
            width: 16,
          },
        }}
      />
    </CardContent>
  </Card>
);

// namespace
CardCarousel.Item = CardCarouselItem;
