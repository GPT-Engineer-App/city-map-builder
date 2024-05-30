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

  const points = [];
  for (let i = 0; i < 10; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    let x, y;
    do {
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);
    } while (map[x][y] !== null);
    map[x][y] = item;
    points.push({ x, y });
  }

  const roads = [];
  const parent = Array(points.length)
    .fill(null)
    .map((_, index) => index);

  const find = (i) => {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  };

  const union = (i, j) => {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) parent[rootJ] = rootI;
  };

  const edges = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = Math.abs(points[i].x - points[j].x) + Math.abs(points[i].y - points[j].y);
      edges.push({ i, j, dist });
    }
  }

  edges.sort((a, b) => a.dist - b.dist);

  for (const { i, j } of edges) {
    if (find(i) !== find(j)) {
      union(i, j);
      connectRoads(points[i].x, points[i].y, points[j].x, points[j].y);
    }
  }

  const connectRoads = (x1, y1, x2, y2) => {
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        roads.push({ x1, y1: y, x2, y2: y });
      }
    } else if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        roads.push({ x1: x, y1, x2: x, y2 });
      }
    } else {
      const midX = Math.floor((x1 + x2) / 2);
      const midY = Math.floor((y1 + y2) / 2);
      connectRoads(x1, y1, midX, y1);
      connectRoads(midX, y1, midX, y2);
      connectRoads(midX, y2, x2, y2);
    }
  };

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
