"use client";
import { Movie } from "@/types";
import Image from "next/image";
import React from "react";
import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
import '@mantine/carousel/styles.css';
import { FaPlay,FaInfoCircle } from "react-icons/fa";
import { Badge } from '@mantine/core';

const HeroSection = ({ movies }: { movies: Movie[] }) => {
  return (
    <Carousel
      withIndicators
      loop
      slideSize="100%"
      slidesToScroll={1} // Ensure only one movie is shown per slide
      height="80vh"
      align="center"
      withControls
      controlSize={50}
      styles={{
        indicator: { width: 10, height: 10 },
        control: { backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" },
      }}
    >
      {movies.map((movie, index) => (
        <Carousel.Slide key={movie.id}>
          {/* Background Image */}
          <div className="relative w-full h-[90vh]">
            <Image
              src={movie.coverUrl!}
              alt={`${movie.title} Cover`}
              fill
              className="object-cover"
            />

            {/* Movie Info Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 flex flex-col justify-center px-20">
              <h1 className="text-6xl font-bold uppercase">{movie.title}</h1>
              <div className="mt-4 flex flex-row items-center gap-4">
                <Badge color="green" className="">
                    <p>Top 5</p>
                </Badge>
                <p className="font-semibold text-lg"># {index + 1} in Movies Today</p>
              </div>
              <p className="text-2xl max-w-2xl mt-4 opacity-80">{movie.description}</p>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <Button
                  size="lg"
                  variant="filled"
                  color="green"
                  onClick={() => window.open(movie.trailerUrl, "_blank")}
                >
                  <FaPlay />
                  <p className="ml-2 uppercase">Play</p>
                </Button>

                <Button size="lg" color="gray" className="">
                 <FaInfoCircle /> 
                 <p className="ml-2">More Info</p>
                </Button>
              </div>
            </div>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default HeroSection;