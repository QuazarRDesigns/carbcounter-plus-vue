<template>
  <nav>
    <div class="top">
      <img
        class="menu-toggle"
        src="@/assets/svgs/hamburger.svg"
        alt="Toggle Menu"
        height="40"
        width="40"
        @click="toggleMenu"
        v-if="this.$route.name !== 'Home'"
      />
      <router-link to="/" class="logo"
        ><img class="logo__img" src="@/assets/svgs/logo.svg" alt="Home"
      /></router-link>
    </div>
    <div ref="menu" class="menu hide" v-if="this.$route.name !== 'Home'">
      <router-link class="bg-blue" to="/carbcalc">CarbCalc&nbsp;</router-link>
      <router-link class="bg-green" to="/dosecalc">DoseCalc&nbsp;</router-link>
      <router-link class="bg-pink" to="/settings">Settings&nbsp;</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleMenu: function() {
      if (this.$refs.menu.classList.contains("hide")) {
        this.$refs.menu.classList.remove("hide");
      } else {
        this.$refs.menu.classList.add("hide");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

nav {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
  background-color: #fff;
  padding: 30px;

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
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.logo {
  flex: 0;
  background-color: transparent;

  &.router-link-exact-active {
    outline: none;
  }
}

.logo__img {
  height: 5vh;
}

.menu {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
}

.menu.hide {
  display: none;
}

@media screen and (min-width: 420px) {
  .menu {
    flex-flow: row nowrap;
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
    height: 45px;
    max-width: 750px;
  }
}
</style>
