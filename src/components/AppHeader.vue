<template>
  <nav>
    <div class="top">
      <img
        v-if="$route.name !== 'Home'"
        class="menu-toggle"
        src="@/assets/svgs/hamburger.svg"
        alt="Toggle Menu"
        height="40"
        width="40"
        @click="toggleMenu"
      />
      <router-link to="/" class="logo"
        ><img class="logo__img" src="@/assets/svgs/logo.svg" alt="Home"
      /></router-link>
    </div>
    <div v-if="$route.name !== 'Home'" ref="menu" class="menu hide">
      <router-link class="bg-blue" to="/carbcalc">CarbCalc</router-link>
      <router-link class="bg-green" to="/dosecalc">DoseCalc</router-link>
      <router-link class="bg-pink" to="/settings">Settings</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const menu = ref(null);

function toggleMenu() {
  if (menu.value.classList.contains("hide")) {
    menu.value.classList.remove("hide");
  } else {
    menu.value.classList.add("hide");
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

nav {
  display: flex;
  flex-flow: column nowrap;
  background-color: #fff;
  padding: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ddd;
    padding: 0.2rem 0.5rem;
    border: none;
    flex: 1;
    color: #fff;
    font-size: 1.2rem;
    text-decoration: none;

    &:focus,
    &.router-link-exact-active {
      outline: 1px solid black;
    }

    &.bg-blue {
      background-color: $blue;

      &:hover {
        background-color: lighten($color: $blue, $amount: 10);
      }
    }

    &.bg-green {
      background-color: $green;

      &:hover {
        background-color: lighten($color: $green, $amount: 10);
      }
    }

    &.bg-pink {
      background-color: $pink;

      &:hover {
        background-color: lighten($color: $pink, $amount: 10);
      }
    }
  }
}

.top {
  display: flex;
  gap: 1rem;
  flex-flow: row nowrap;
  align-items: center;
}

.logo {
  flex: 0;
  margin: 0 auto;
  background-color: transparent;

  &.router-link-exact-active {
    outline: none;
  }
}

.logo__img {
  height: #{"max(5vh, 3rem)"};
}

.menu {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
}

@media screen and (max-width: 420px) {
  .menu {
    height: 8.125rem;
    margin-top: 1rem;
    overflow: hidden;
    transition: height 0.5s cubic-bezier(0, 0, 0.45, 1),
      opacity 0.3s 0.1s cubic-bezier(0, 0, 0, 0.9),
      margin-top 0.1s cubic-bezier(0, 0, 0.2, 0);
  }

  .menu.hide {
    height: 0;
    margin-top: 0;
    opacity: 0;
    transition: height 0.5s cubic-bezier(0, 0, 0.45, 1),
      opacity 0.4s cubic-bezier(0, 0, 0, 0.9),
      margin-top 0.3s 0.2s cubic-bezier(0, 0, 0.8, 1);
  }
}

@media screen and (min-width: 420px) {
  nav {
    gap: 1rem;
  }

  .menu {
    flex-flow: row nowrap;
    height: 3rem;
  }

  .top {
    justify-content: center;
  }

  .menu-toggle {
    display: none;
  }

  .menu.hide {
    display: flex;
  }
}

@media screen and (min-width: 600px) {
  nav {
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .menu {
    flex: 1;
    max-width: #{"max(30%, 45rem)"};
  }
}
</style>
