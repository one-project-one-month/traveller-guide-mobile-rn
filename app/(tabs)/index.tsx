import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/homepage/Header";
import SearchBar from "@/components/homepage/SearchBar";
import HeroCarousel, { HeroSlide } from "@/components/homepage/HeroCarousel";

const Index = () => {
  const [query, setQuery] = useState("");
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSlides: HeroSlide[] = [
        {
          id: "santorini",
          imageUrl:
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1400&auto=format&fit=crop",
        },
        {
          id: "maldives",
          imageUrl:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
        },
        {
          id: "bali-rice-terraces",
          imageUrl:
            "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1400&auto=format&fit=crop",
        },
      ];
      setSlides(mockSlides);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <ScreenWrapper>
      <Header />
      <View className="px-[26px]">
        <Text className="text-[18px] font-400 font-poppin mb-5">
          Let's explore for your trip
        </Text>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
        />

        {!loading && slides.length > 0 && (
          <View className="mt-6">
            <HeroCarousel
              data={slides}
              loading={loading}
              onPressSlide={(item) => console.log("Pressed", item.id)}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Index;

const styles = StyleSheet.create({});
