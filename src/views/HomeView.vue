<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script setup lang="ts">
import { apolloClient, EXAMPLE_QUERY } from '@/graphql';

const res = await apolloClient.query({ query: EXAMPLE_QUERY });
console.log(res);
</script>
