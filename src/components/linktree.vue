<template>
  <div class="full-screen-container">
    <DotLottieVue
      autoplay
      src="/topBar.lottie"
      :layout="!bpSmAndUp ? { fit: 'fill' } : { fit: 'contain' }"
      :style="!bpSmAndUp 
      ? 'width: 100%; height: 67vw; display: block;' 
      : 'width: 100%; max-width: 800px; aspect-ratio: 1917 / 958; display: block; margin: 0 auto;'"
    />

    <div class="w-100 d-flex align-center justify-center" style="height: 100%;">
      <v-slide-x-reverse-transition>
        <v-card 
          v-if="showCard"
          class="link-card d-flex flex-column py-5 rounded-xl" 
          :width="!bpSmAndUp ? '95%' : '50%'" 
          :style="!bpSmAndUp ? 'height: 90vw;' : 'height: 400px;'"
        >
          <div class="link-actions d-flex flex-column justify-center align-center" style="height: 100%;">
            <v-slide-y-reverse-transition>
              <v-btn
                v-if="showButtons"
                density="default"
                rounded="pill"
                class="mb-6 text-primary rounded border"
                flat
                variant="text"
                width="90%"
                @click="controller.redirectToGoogleMapsReview"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <span> Deixe uma Avaliação</span>
                  <div class="svg-icon svg-icon-review"></div>
                </div>
              </v-btn>
            </v-slide-y-reverse-transition>

            <v-slide-y-reverse-transition>
              <v-btn
                v-if="showButtons"
                density="default"
                rounded="pill"
                class="mb-6 text-primary rounded border"
                flat
                variant="text"
                width="90%"
                @click="controller.redirectToMenu"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <span>Ver Menu</span>
                  <div class="svg-icon svg-icon-menu"></div>
                </div>
              </v-btn>
            </v-slide-y-reverse-transition>

            <v-slide-y-reverse-transition>
              <v-btn
                v-if="showButtons"
                density="default"
                rounded="pill"
                class="mb-6 text-primary rounded border"
                flat
                variant="text"
                width="90%"
                @click="controller.redirectToInsta"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <span>Instagram</span>
                  <div class="svg-icon svg-icon-insta"></div>
                </div>
              </v-btn>
            </v-slide-y-reverse-transition>

            <v-slide-y-reverse-transition>
              <v-btn
                v-if="showButtons"
                density="default"
                rounded="pill"
                class="mb-6 text-primary rounded border"
                flat
                variant="text"
                width="90%"
                @click="controller.handleConnectToWifi"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <span>Conectar Wi-Fi</span>
                  <div class="svg-icon svg-icon-wifi"></div>
                </div>
              </v-btn>
            </v-slide-y-reverse-transition>

            <v-slide-y-reverse-transition>
              <v-btn
                v-if="showButtons"
                density="default"
                rounded="pill"
                class="text-primary rounded border "
                flat
                variant="text"
                width="90%"
                @click="controller.redirectToGame"
              >
                <div class="d-flex align-center justify-space-between w-100">
                  <span>Jogar</span>
                  <div class="svg-icon svg-icon-game"></div>
                </div>
              </v-btn>
            </v-slide-y-reverse-transition>
          </div>
        </v-card>
      </v-slide-x-reverse-transition>
    </div>

    <v-dialog
      v-model="controller.openDialogConnectWifi.value"
      max-width="90%"
    >
      <v-card class="d-flex flex-column align-center justify-center pa-3">
        <div class="border-lg bg-white rounded-lg pa-2">
          <qrcode-svg
            :value="controller.wifiQrCode.value"
            :size="220"
            level="L"
            background="#ffffff"
            foreground="#000000"
          />
        </div>

        <v-btn
          density="default"
          rounded="pill"
          flat
          variant="tonal"
          width="90%"
          @click="controller.copyWifiPass"
          class="mt-2 text-primary"
        >Copiar Senha</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { linktreeController } from './linktree';
import { QrcodeSvg } from 'qrcode.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { useDisplay } from 'vuetify/dist/vuetify.js';

// Tempo (ms) para o card terminar de entrar antes dos botões
const BUTTONS_ENTRY_DELAY = 500

const { controller } = linktreeController();
const { width } = useDisplay()

const bpSmAndUp = computed(() => width.value > 490)

// Controla a entrada em sequência: primeiro o card, depois os botões
const showCard = ref(false)
const showButtons = ref(false)
let buttonsTimer = null

onMounted(async () => {
  controller.getQueryParams()

  await nextTick()
  showCard.value = true

  buttonsTimer = setTimeout(() => {
    showButtons.value = true
  }, BUTTONS_ENTRY_DELAY)
})

onBeforeUnmount(() => {
  clearTimeout(buttonsTimer)
})
</script>

<style scoped>
.full-screen-container {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.svg-icon {
  width: 16px;
  height: 16px;
  /* Cor vinda do tema (secondary), sem herdar a cor do texto */
  background-color: rgb(var(--v-theme-secondary));
  transition: background-color 0.3s ease;
}

/* Hover dos botões de link: fundo secondary, texto e ícone em primary */
.link-actions .v-btn {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.link-actions .v-btn:hover {
  background-color: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-primary));
}

/* O overlay nativo do Vuetify usa currentColor e tingiria o fundo secondary */
.link-actions .v-btn:hover :deep(.v-btn__overlay) {
  opacity: 0;
}

.link-actions .v-btn:hover .svg-icon {
  background-color: rgb(var(--v-theme-primary));
}

/* Ícones de review e menu: um pouco maiores e com mais peso.
   A máscara é repetida com pequenos deslocamentos e composta com "add",
   engrossando a silhueta sem alterar os arquivos SVG. */
.svg-icon-review,
.svg-icon-menu {
  width: 20px;
  height: 20px;
  --icon-weight: 0.2px;
  --icon-mask: url('/review.svg');
  -webkit-mask-image: var(--icon-mask), var(--icon-mask), var(--icon-mask), var(--icon-mask), var(--icon-mask);
  mask-image: var(--icon-mask), var(--icon-mask), var(--icon-mask), var(--icon-mask), var(--icon-mask);
  -webkit-mask-position:
    center,
    calc(50% + var(--icon-weight)) center,
    calc(50% - var(--icon-weight)) center,
    center calc(50% + var(--icon-weight)),
    center calc(50% - var(--icon-weight));
  mask-position:
    center,
    calc(50% + var(--icon-weight)) center,
    calc(50% - var(--icon-weight)) center,
    center calc(50% + var(--icon-weight)),
    center calc(50% - var(--icon-weight));
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-composite: source-over;
  mask-composite: add;
}

.svg-icon-menu {
  --icon-mask: url('/menu.svg');
}

/* Card: o slide nativo do Vuetify desloca apenas 15px, então ampliamos
   a entrada para vir da direita em direção à esquerda. */
.link-card.slide-x-reverse-transition-enter-from {
  transform: translateX(110%);
}

.link-card.slide-x-reverse-transition-enter-active {
  transition-duration: 0.45s;
}

.link-card.slide-x-reverse-transition-enter-active,
.link-card.slide-x-reverse-transition-leave-active {
  will-change: transform, opacity;
}

/* Botões: entrada em cascata (stagger) logo após o card se estabilizar */
.link-actions > .slide-y-reverse-transition-enter-active {
  transition-duration: 0.35s;
}

.link-actions > .slide-y-reverse-transition-enter-active:nth-child(1) {
  transition-delay: 0s;
}

.link-actions > .slide-y-reverse-transition-enter-active:nth-child(2) {
  transition-delay: 0.08s;
}

.link-actions > .slide-y-reverse-transition-enter-active:nth-child(3) {
  transition-delay: 0.16s;
}

.link-actions > .slide-y-reverse-transition-enter-active:nth-child(4) {
  transition-delay: 0.24s;
}

.link-actions > .slide-y-reverse-transition-enter-active:nth-child(5) {
  transition-delay: 0.32s;
}

.svg-icon-insta {
  mask: url('/insta.svg') no-repeat center / contain;
  -webkit-mask: url('/insta.svg') no-repeat center / contain;
}

.svg-icon-wifi {
  mask: url('/wifi.svg') no-repeat center / contain;
  -webkit-mask: url('/wifi.svg') no-repeat center / contain;
}

.svg-icon-game {
  mask: url('/game.svg') no-repeat center / contain;
  -webkit-mask: url('/game.svg') no-repeat center / contain;
}

:deep(.v-btn__content) {
  width: 100% !important;
}
</style>