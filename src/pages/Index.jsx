import React, { useState } from "react";
import { Box, Button, Container, VStack, HStack, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { FaHome, FaStore } from "react-icons/fa";

const GRID_SIZE = 10;
const CELL_SIZE = 50;

const generateRandomMap = () => {
  const map = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
  const items = ["house", "store"];

  // Place houses and stores randomly
  for (let i = 0; i < 10; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    let x, y;
    do {
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);
    } while (map[x][y] !== null);
    map[x][y] = item;
  }

  // Generate roads
  const roads = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (map[i][j] !== null) {
        if (i > 0 && map[i - 1][j] !== null) roads.push({ x1: i, y1: j, x2: i - 1, y2: j });
        if (j > 0 && map[i][j - 1] !== null) roads.push({ x1: i, y1: j, x2: i, y2: j - 1 });
      }
    }
  }

  return { map, roads };
};

const Map = ({ map, roads }) => (
  <Grid templateColumns={`repeat(${GRID_SIZE}, ${CELL_SIZE}px)`} templateRows={`repeat(${GRID_SIZE}, ${CELL_SIZE}px)`} gap={0}>
    {map.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <GridItem key={`${rowIndex}-${colIndex}`} w={`${CELL_SIZE}px`} h={`${CELL_SIZE}px`} border="1px solid lightgray" display="flex" alignItems="center" justifyContent="center">
          {cell === "house" && <Icon as={FaHome} w={6} h={6} />}
          {cell === "store" && <Icon as={FaStore} w={6} h={6} />}
        </GridItem>
      )),
    )}
    {roads.map((road, index) => (
      <Box key={index} position="absolute" top={`${road.x1 * CELL_SIZE + CELL_SIZE / 2}px`} left={`${road.y1 * CELL_SIZE + CELL_SIZE / 2}px`} width={`${Math.abs(road.x2 - road.x1) * CELL_SIZE}px`} height={`${Math.abs(road.y2 - road.y1) * CELL_SIZE}px`} border="1px solid black" />
    ))}
  </Grid>
);

const Index = () => {
  const [mapData, setMapData] = useState(generateRandomMap());

  const handleGenerateMap = () => {
    setMapData(generateRandomMap());
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">City Map Generator</Text>
        <Button onClick={handleGenerateMap} colorScheme="teal">
          Generate New Map
        </Button>
        <Box position="relative" width={`${GRID_SIZE * CELL_SIZE}px`} height={`${GRID_SIZE * CELL_SIZE}px`}>
          <Map map={mapData.map} roads={mapData.roads} />
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
