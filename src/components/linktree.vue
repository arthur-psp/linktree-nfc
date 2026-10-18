<template>
  <div class="full-screen-container">
    <DotLottieVue
      autoplay
      :src="lottieSrc"
      :layout="lottieLayout"
      :class="['lottie-topbar', bpSmAndUp ? 'lottie-topbar--desktop' : 'lottie-topbar--mobile']"
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
                v-if="showButtons && controller.hasGoogleReview.value"
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
                v-if="showButtons && controller.hasMenu.value"
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
                v-if="showButtons && controller.hasInstagram.value"
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
                v-if="showButtons && controller.hasWifi.value"
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
      :max-width="bpSmAndUp ? 360 : '90%'"
    >
      <v-card class="wifi-card d-flex flex-column align-center text-center">
        <h2 class="wifi-title text-primary">Senha do Wi-Fi</h2>
        <p class="wifi-subtitle text-medium-emphasis">
          Aponte a câmera para o QR code ou toque em “Copiar Senha”.
        </p>

        <div class="wifi-qr d-flex align-center justify-center">
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
          variant="flat"
          width="100%"
          @click="controller.copyWifiPass"
          class="wifi-action wifi-action--primary mt-6"
        >Copiar Senha</v-btn>

        <v-btn
          density="default"
          rounded="pill"
          flat
          variant="text"
          width="100%"
          @click="controller.openDialogConnectWifi.value = false"
          class="wifi-action wifi-action--secondary mt-1"
        >Fechar</v-btn>
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

/* Arquivo da animação do topo por breakpoint.
   O .lottie atual tem frame 393 x 275 (proporção mobile) e é usado nos dois
   casos; quando existir a versão desktop dedicada, basta trocar o valor de
   DESKTOP_LOTTIE_SRC (ex.: '/topBar.desktop.lottie') — o arquivo precisa estar
   em public/. Se existir também um mobile dedicado, troque MOBILE_LOTTIE_SRC. */
const MOBILE_LOTTIE_SRC = '/topBar.lottie'
const DESKTOP_LOTTIE_SRC = '/topBar.lottie'

const { controller } = linktreeController();
const { width } = useDisplay()

const bpSmAndUp = computed(() => width.value > 490)

const lottieSrc = computed(() => (bpSmAndUp.value ? DESKTOP_LOTTIE_SRC : MOBILE_LOTTIE_SRC))

/* 'contain' em vez de 'fill': no mobile o container tem exatamente a proporção
   do arquivo (393 x 275), então a animação preenche 100% da largura sem
   distorção nem corte; no desktop mantém o enquadramento de hoje. */
const lottieLayout = computed(() => ({ fit: 'contain', align: [0.5, 0.5] }))

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

/* ---- Dialog da senha do Wi-Fi: apenas estética (HIG-like) ---- */
.wifi-card {
  border-radius: 24px;
  padding: 28px 24px 20px;
  overflow: hidden;
}

.wifi-title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.wifi-subtitle {
  margin: 8px 0 0;
  max-width: 30ch;
  font-size: 0.8125rem;
  line-height: 1.5;
}

/* Bloco claro que "abriga" o QR (precisa de fundo claro para ser lido) */
.wifi-qr {
  margin-top: 22px;
  padding: 12px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.06),
    0 10px 24px rgba(0, 0, 0, 0.08);
}

.wifi-action {
  min-height: 46px;
  font-weight: 500;
  letter-spacing: 0;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    opacity 0.25s ease,
    transform 0.15s ease;
}

/* Ação principal em destaque, na cor de marca do tema */
.wifi-action--primary {
  background-color: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
}

.wifi-action--primary:hover {
  background-color: color-mix(in srgb, rgb(var(--v-theme-secondary)) 86%, #000);
}

.wifi-action--primary:active {
  transform: scale(0.985);
}

/* Ação secundária discreta */
.wifi-action--secondary {
  color: rgb(var(--v-theme-primary));
  opacity: 0.72;
}

.wifi-action--secondary:hover {
  opacity: 1;
  background-color: color-mix(in srgb, rgb(var(--v-theme-primary)) 8%, transparent);
}

/* Animação do topo (DotLottieVue) */
.lottie-topbar {
  display: block;
  width: 100%;
}

/* Mobile: mesma proporção do frame do arquivo (393 x 275).
   flex-shrink: 0 evita que o item encolha no flex column — o encolhimento
   deixava o canvas mais baixo que a proporção, esticando a arte. */
.lottie-topbar--mobile {
  aspect-ratio: 393 / 275;
  flex-shrink: 0;
}

/* Desktop: comportamento atual (max-width 800px, centralizado) */
.lottie-topbar--desktop {
  aspect-ratio: 1917 / 958;
  max-width: 800px;
  margin: 0 auto;
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