<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script setup lang="ts">
import { apolloClient, FILM_QUERY } from '@/graphql';

const res = await apolloClient.query({ query: FILM_QUERY, variables: { id: 'ZmlsbXM6MQ==' } });
console.log(res);
</script>
