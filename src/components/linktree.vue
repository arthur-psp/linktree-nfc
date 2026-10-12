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
      <v-card 
        class="d-flex flex-column py-5 rounded-xl" 
        :width="!bpSmAndUp ? '95%' : '50%'" 
        :style="!bpSmAndUp ? 'height: 90vw;' : 'height: 400px;'"
      >
        <div class="d-flex flex-column justify-center align-center" style="height: 100%;">
          <v-btn
            density="default"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToGoogleMapsReview"
          >
            <template v-slot:prepend>
              <div class="svg-icon svg-icon-review" style="background-color: currentColor;"></div>
            </template>
          Deixe uma Avaliação</v-btn>

          <v-btn
            density="default"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToMenu"
          >
            <template v-slot:prepend>
              <div class="svg-icon svg-icon-menu" style="background-color: currentColor;"></div>
            </template>
          Ver Menu</v-btn>

          <v-btn
            density="default"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToInsta"
          >
            <template v-slot:prepend>
              <div class="svg-icon svg-icon-insta" style="background-color: currentColor;"></div>
            </template>
          Instagram</v-btn>

          <v-btn
            density="default"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.handleConnectToWifi"
          >
            <template v-slot:prepend>
              <div class="svg-icon svg-icon-wifi" style="background-color: currentColor;"></div>
            </template>
          Conectar Wi-Fi</v-btn>

          <v-btn
            density="default"
            rounded="pill"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToGame"
          >
            <template v-slot:prepend>
              <div class="svg-icon svg-icon-game" style="background-color: currentColor;"></div>
            </template>
          Jogar</v-btn>
        </div>
      </v-card>
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
          class="mt-2"
        >Copiar Senha</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { linktreeController } from './linktree';
import { QrcodeSvg } from 'qrcode.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { useDisplay } from 'vuetify/dist/vuetify.js';

const { controller } = linktreeController();
const { width } = useDisplay()

const bpSmAndUp = computed(() => width.value > 490)

onMounted(() => {
  controller.getQueryParams()
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
  opacity: 50%;
}

.svg-icon-review {
  mask: url('/review.svg') no-repeat center / contain;
  -webkit-mask: url('/review.svg') no-repeat center / contain;
  border-width: 10px !important;
  font-weight: 10px !important;
}

.svg-icon-menu {
  mask: url('/menu.svg') no-repeat center / contain;
  -webkit-mask: url('/menu.svg') no-repeat center / contain;
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
</style>