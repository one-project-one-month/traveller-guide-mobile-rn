import { Dimensions, Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export type HeroSlide = {
  id: string;
  imageUrl: string;
  href?: string;
};

type HeroCarouselProps = {
  data: HeroSlide[];
  loading?: boolean;
  onPressSlide?: (slide: HeroSlide) => void;
  aspectRatio?: number;
};

const HeroCarousel = ({
  data,
  loading = false,
  onPressSlide,
  aspectRatio = 2.2,
}: HeroCarouselProps) => {
  const height = (width - 32) / aspectRatio;
  const [activeIndex, setActiveIndex] = useState(0);

  if (data.length === 0) {
    return (
      <View className="px-4">
        <View
          className="bg-gray-200 rounded-2xl"
          style={{ width: width - 32, height }}
        />
      </View>
    );
  }

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={true}
        autoPlayInterval={3000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 0, 
          parallaxScrollingScale: 1, 
        }}
        data={data}
        scrollAnimationDuration={700}
        pagingEnabled
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View >
            <Pressable onPress={() => onPressSlide?.(item)}>
              <Image
                source={{ uri: item.imageUrl }}
                className="rounded-2xl "
                resizeMode="cover"
              style={{ width: width - 32, height }}
            />
          </Pressable>
        </View>
      )}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 11,
        }}
      >
        {data.map((_, index) => (
          <View
            key={index}
            style={{
              width: index === activeIndex ? 22 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === activeIndex ? "#000000" : "#C4C4C4",
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default HeroCarousel;
