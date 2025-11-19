<template>
  <div class="layout">
    <header class="header bg-default">
      <div class="header__container">
        <h1>BambitTestTask</h1>

        <UColorModeSwitch />
      </div>
    </header>

    <main class="main">
      <UContainer class="container">
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 48px;

  display: flex;
  align-items: center;

  &__container {
    max-width: 600px;
    margin-inline: auto;
    width: 100%;
    display: flex;
    align-items: center;

    @include mobile {
      padding-inline: 10px;
    }
  }

  &__container h1 {
    flex: 1;
    text-align: center;
  }

  &__container > *:last-child {
    margin-left: auto;
  }
}

.container {
  --ui-container: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.main {
  margin-top: calc(32px + 20px);
  flex: 1;

  @include mobile {
    padding-inline: 10px;
  }
}
</style>
