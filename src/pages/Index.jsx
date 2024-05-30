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

  // Generate roads to connect all houses and stores
  const roads = [];
  const visited = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(false));

  const connectRoads = (x1, y1, x2, y2) => {
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        roads.push({ x1, y1: y, x2, y2: y });
      }
    } else if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        roads.push({ x1: x, y1, x2: x, y2 });
      }
    }
  };

  const dfs = (x, y) => {
    visited[x][y] = true;
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    directions.forEach(({ dx, dy }) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && map[nx][ny] !== null && !visited[nx][ny]) {
        connectRoads(x, y, nx, ny);
        dfs(nx, ny);
      }
    });
  };

  outer: for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (map[i][j] !== null) {
        dfs(i, j);
        break outer;
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
    {roads.map((road, index) => {
      const isHorizontal = road.y1 === road.y2;
      const length = isHorizontal ? Math.abs(road.x2 - road.x1) * CELL_SIZE : Math.abs(road.y2 - road.y1) * CELL_SIZE;
      return <Box key={index} position="absolute" top={isHorizontal ? `${road.y1 * CELL_SIZE + CELL_SIZE / 2 - 2}px` : `${Math.min(road.y1, road.y2) * CELL_SIZE + CELL_SIZE / 2 - 2}px`} left={isHorizontal ? `${Math.min(road.x1, road.x2) * CELL_SIZE + CELL_SIZE / 2 - 2}px` : `${road.x1 * CELL_SIZE + CELL_SIZE / 2 - 2}px`} width={isHorizontal ? `${length}px` : "4px"} height={isHorizontal ? "4px" : `${length}px`} backgroundColor="black" />;
    })}
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
