<template>
  <div>
    <div class="w-100 d-flex align-center justify-center" style="height: 100dvh;">
      <v-card class="d-flex flex-column py-5 rounded-xl" width="80%">
        <div class="d-flex flex-column justify-center align-center">
          <v-btn
            density="comfortable"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToGoogleMapsReview"
          >Deixe uma Avaliação</v-btn>

          <v-btn
            density="comfortable"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToMenu"
          >Ver Menu</v-btn>

          <v-btn
            density="comfortable"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToInsta"
          >Instagram</v-btn>

          <v-btn
            density="comfortable"
            rounded="pill"
            class="mb-6"
            flat
            variant="tonal"
            width="90%"
            @click="controller.handleConnectToWifi"
          >Conectar Wi-Fi</v-btn>

          <v-btn
            density="comfortable"
            rounded="pill"
            flat
            variant="tonal"
            width="90%"
            @click="controller.redirectToGame"
          >Jogar</v-btn>
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
          density="comfortable"
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
import { onMounted } from 'vue';
import { linktreeController } from './linktree';
import { QrcodeSvg } from 'qrcode.vue';

const { controller } = linktreeController();

onMounted(() => {
  controller.getQueryParams()
})
</script>