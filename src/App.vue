<script setup>
import UserScalePage from "./Hooks/UserScalePage";
let opstion = {
  targetX: 1920,
  targetY: 1080,
  targetRatio: 16 / 9,
};
UserScalePage(opstion);
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
